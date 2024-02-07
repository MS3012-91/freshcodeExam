const { Conversation, Message, Catalog } = require('../db/models/mongoModels');
const moment = require('moment');
const createError = require('http-errors');
const db = require('../db/models/sequelizeModels');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const { userId: senderId } = req.tokenData;
  const { recipient, messageBody, interlocutor } = req.body;
  const participants = [senderId, recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const newConversation = await createOrUpdateConversation(
      participants,
      next
    );
    const conversationId = newConversation._id;
    const message = createMessage(senderId, messageBody, conversationId);
    await message.save();
    message._doc.participants = participants;
    const preview = {
      _id: newConversation._id,
      sender: senderId,
      text: messageBody,
      createAt: message.createdAt,
      participants: newConversation.participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(recipient, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          ...interlocutor,
          id: senderId,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

const createOrUpdateConversation = async (participants, next) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      {
        participants,
      },
      { participants, blackList: [false, false], favoriteList: [false, false] },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );
    if (!conversation) {
      next(createError(400, 'Conversation not update'));
    }
    return conversation;
  } catch (err) {
    next(err);
  }
};

const createMessage = (senderId, messageBody, conversationId) => {
  return new Message({
    sender: senderId,
    body: messageBody,
    conversation: conversationId,
  });
};

module.exports.getChat = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { interlocutorId } = req.params;
  const interlocutorNumber = parseInt(interlocutorId, 10);
  const participants = [userId, interlocutorNumber];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await getMessages(participants, interlocutorId, next);
    const interlocutor = await userQueries.findUser({
      id: interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (participants, interlocutorId, next) => {
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (!messages.length) {
      next(createError(404, 'Messages not found'));
    }
    return messages;
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  const { userId } = req.tokenData;
  try {
    let conversations = await getConversations(userId, next);
    const interlocutors = [];
    conversations.forEach(conversation => {
      interlocutors.push(
        conversation.participants.find(participant => participant !== userId)
      );
    });
    conversations = await getConversationData(
      interlocutors,
      conversations,
      next
    );
    conversations = await getConversationData(
      interlocutors,
      conversations,
      next
    );
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

const getConversations = async (userId, next) => {
  try {
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
    if (!conversations.length) {
      next(createError(404, 'Conversations not found'));
      next(createError(404, 'Conversations not found'));
    }
    return conversations;
  } catch (err) {
    next(err);
  }
};

const getConversationData = async (interlocutors, conversations, next) => {
  try {
    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    if (!senders.length) {
      createError(404, 'Senders not found');
      createError(404, 'Senders not found');
    }
    conversations.forEach(conversation => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    return conversations;
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const { chatId } = req.params;
  const { blackListFlag } = req.body;
  const { userId } = req.tokenData;
  const participants = await getParticipants(chatId, next);
  const predicate = 'blackList.' + participants.indexOf(userId);
  const chat = await getChat(
    chatId,
    predicate,
    userId,
    blackListFlag,
    participants,
    next
  );
  res.send(chat);
};

const getParticipants = async (chatId, next) => {
  try {
    const conversation = await Conversation.findById(chatId);
    if (!conversation) {
      next(createError(400, 'Conversation not found'));
    }
    const participants = await conversation.participants;
    return participants;
  } catch (err) {
    next(err);
  }
};

const getChat = async (
  chatId,
  predicate,
  userId,
  blackListFlag,
  participants,
  next
) => {
  try {
    const chat = await Conversation.findOneAndUpdate(
      { _id: chatId },
      { $set: { [predicate]: blackListFlag } },
      { new: true }
    );
    if (!chat) {
      next(createError(404, 'Chat not found'));
    }
    const interlocutorId = participants.filter(
      participant => participant !== userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
    return chat;
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const predicate =
    'favoriteList.' + req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [predicate]: req.body.favoriteFlag } },
      { new: true }
    );
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const catalog = new Catalog({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { catalogName: req.body.catalogName },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { $addToSet: { chats: req.body.chatId } },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { $pull: { chats: req.body.chatId } },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await Catalog.remove({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId: req.tokenData.userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1,
        },
      },
    ]);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

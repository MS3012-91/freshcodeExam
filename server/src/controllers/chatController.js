const { Conversation, Message, Catalog } = require('../db/models/mongoModels');
const createError = require('http-errors');
const _ = require('lodash');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const {
  createOrUpdateConversation,
  getMessages,
  getConversations,
  getConversationData,
  getParticipants,
  getChat,
} = require('../utils/chatControllerHelpers');

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
    const message = new Message({
      sender: senderId,
      body: messageBody,
      conversation: conversationId,
    });
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
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const { chatId } = req.params;
  console.log('chatId', chatId);
  const { blackListFlag } = req.body;
  const { userId } = req.tokenData;
  const conversation = await getParticipants(chatId, next);
  const participants = conversation.participants;
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

module.exports.favoriteChat = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { chatId } = req.params;
  const {
    chatParams: { participants, favoriteFlag },
  } = req.body;
  const predicate = 'favoriteList.' + participants.indexOf(userId);
  try {
    const chat = await Conversation.findByIdAndUpdate(
      { _id: chatId },
      { $set: { [predicate]: favoriteFlag } },
      { new: true }
    );
    if (!chat) {
      next(createError(404, 'Chat not found'));
    }
    res.send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { catalogName } = req.body;
  const { chatId } = req.params;
  try {
    const catalog = await Catalog.create({
      userId,
      catalogName,
      chats: [chatId],
    });
    if (!catalog) {
      next(createError(404, 'Catalog not found'));
    }
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const { catalogId } = req.params;
  const { catalogName } = req.body;
  const { userId } = req.tokenData;
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: catalogId,
        userId,
      },
      { catalogName },
      { new: true }
    );
    if (!catalog) {
      next(createError(404, 'Catalog not found'));
    }
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { chatId } = req.params;
  const { userId } = req.tokenData;
  const { catalogId } = req.body;
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: catalogId,
        userId: userId,
      },
      { $addToSet: { chats: chatId } },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { chatId } = req.params;
  const { catalogId } = req.body;
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: catalogId,
        userId,
      },
      { $pull: { chatId } },
      { new: true }
    );
    if (!catalog) {
      next(createError(404, 'Catalog not found'));
    }
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const { catalogId } = req.params;
  const { userId } = req.tokenData;
  try {
    const result = await Catalog.remove({
      _id: catalogId,
      userId,
    });
    if (!result.deletedCount) {
      next(createError(404, 'Catalog not found'));
    }
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const { userId } = req.tokenData;
  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId } },
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

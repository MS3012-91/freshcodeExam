const createError = require('http-errors');
const controller = require('../socketInit');
const db = require('../db/models/sequelizeModels');
const { Conversation, Message } = require('../db/models/mongoModels');

module.exports.createOrUpdateConversation = async (participants, next) => {
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

module.exports.getMessages = async (participants, interlocutorId, next) => {
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

module.exports.getConversations = async (userId, next) => {
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
    }
    return conversations;
  } catch (err) {
    next(err);
  }
};

module.exports.getConversationData = async (
  interlocutors,
  conversations,
  next
) => {
  try {
    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    if (!senders.length) {
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

module.exports.getParticipants = async (chatId, next) => {
  try {
    const conversation = await Conversation.findById(chatId);
    if (!conversation) {
      next(createError(400, 'Conversation not found'));
    }
    return conversation;
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (
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

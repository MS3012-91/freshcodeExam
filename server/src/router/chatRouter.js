const express = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = express.Router();

chatRouter.post('/newMessage', chatController.addMessage);

chatRouter.get('/getChat:interlocutorId', chatController.getChat);

chatRouter.get('/getPreview', chatController.getPreview);

chatRouter.post('/blackList', chatController.blackList);

chatRouter.post('/favorite', chatController.favoriteChat);

chatRouter.post('/createCatalog', chatController.createCatalog);

chatRouter.post('/updateNameCatalog', chatController.updateNameCatalog);

chatRouter.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

chatRouter.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

chatRouter.post('/deleteCatalog', chatController.deleteCatalog);

chatRouter.post('/getCatalogs', chatController.getCatalogs);

module.exports = chatRouter;

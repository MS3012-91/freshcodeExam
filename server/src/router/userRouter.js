const express = require('express');
const hashPass = require('../middlewares/hashPassMiddle');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');

const userRouter = express.Router();

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

userRouter.post('/login', validators.validateLogin, userController.login);

userRouter.post('/getUser', checkToken.checkAuth);

userRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

userRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

module.exports = userRouter;

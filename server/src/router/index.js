const express = require('express');
const { checkToken } = require('../middlewares');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/contest', checkToken.checkToken, contestRouter);
router.use('/chat', checkToken.checkToken, chatRouter);

module.exports = router;

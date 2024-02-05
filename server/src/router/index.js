const express = require('express');
const { checkToken } = require('../middlewares/checkToken');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/contest', checkToken, contestRouter);
router.use('/chat', checkToken, chatRouter);

module.exports = router;

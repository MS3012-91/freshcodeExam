const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require ('../controllers/contestController')
const upload = require('../utils/fileUpload');

const contestRouter = express.Router();

contestRouter.post(
  '/dataForContest',
  contestController.dataForContest
);

contestRouter.post(
  '/getCustomersContests',
  contestController.getCustomersContests
);

contestRouter.get(
  '/getContestById',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.post(
  '/getAllContests',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter.get(
  '/downloadFile/:fileName',
  contestController.downloadFile
);

contestRouter.post(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest
);

contestRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

contestRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

module.exports = contestRouter;
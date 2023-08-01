const express = require('express');
const transferController = require('../controllers/transfer.controller');
const transferMiddleware = require('../middlewares/transfer.middleware');

const router = express.Router();

router
  .route('/')
  .post(transferMiddleware.validateUser, transferController.registerTransfer);

module.exports = router;

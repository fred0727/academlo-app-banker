const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const router = express.Router();

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.login);
router
  .route('/:id/history')
  .get(userMiddleware.validateUser, userController.history);

module.exports = router;

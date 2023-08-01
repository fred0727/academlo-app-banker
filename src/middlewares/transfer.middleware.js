const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateUser = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;

  const userReceiver = await User.findOne({
    where: {
      id: receiverUserId,
    },
  });

  const userSender = await User.findOne({
    where: {
      id: senderUserId,
    },
  });

  if (!userReceiver) {
    return next(new AppError(`User with id ${id} not found!`, 400));
  }

  if (Number(userSender.amount) < Number(amount)) {
    return next(
      new AppError(
        `Insufficient funds in user account with id ${senderUserId}`,
        400
      )
    );
  }

  next();
});

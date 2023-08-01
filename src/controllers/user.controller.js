const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const randomAccountNumber = require('../utils/accountNumber');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signUp = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const accountNumber = randomAccountNumber();
  const user = await User.create({
    name: name.toLowerCase().trim(),
    accountNumber,
    password,
  });
  return res.status(201).json({
    status: 'success',
    message: 'User create successfully',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  if (user) {
    return res.status(200).json({
      status: 'success',
      message: 'Login successfully',
      user: {
        id: user.id,
        name: user.name,
        accountNumber: user.accountNumber,
        amount: user.amount,
        status: user.status,
      },
    });
  } else {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }
});

exports.history = catchAsync(async (req, res, next) => {
  const { user } = req;

  const userTransfer = await Transfer.findOne({
    where: {
      senderUserId: user.id,
    },
  });

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: user.id,
    },
  });

  if (!userTransfer) {
    return next(new AppError(`User does not have transfers`, 401));
  }

  return res.status(200).json({
    status: 'Success',
    transfers,
  });
});

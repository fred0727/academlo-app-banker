const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.registerTransfer = catchAsync(async (req, res) => {
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

  const newAmountReceiver = userReceiver.amount + amount;
  const newAmountSender = userSender.amount - amount;

  await userReceiver.update({
    amount: newAmountReceiver,
  });

  await userSender.update({
    amount: newAmountSender,
  });

  await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Transfer complete!',
  });
});

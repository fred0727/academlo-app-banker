const User = require('../models/user.model');

const validateAccountNumber = async (randomNumber) => {
  const userAccount = await User.findOne({
    where: {
      accountNumber: randomNumber,
    },
  });

  if (!userAccount) {
    return true;
  } else {
    return false;
  }
};

const randomAccountNumber = () => {
  let number = 0;

  while (number == 0) {
    var min = 10000000;
    var max = 10000000000;

    var randomNumber = Math.floor(Math.random() * (max - min) + min);
    let validate = validateAccountNumber(randomNumber);
    if (validate) {
      number = randomNumber;
    }
  }
  return number;
};

module.exports = randomAccountNumber;

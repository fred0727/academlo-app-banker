const AppError = require('../utils/appError');

const handleCastError22001 = () => {
  return new AppError('The number of character is greater and excepted', 400);
};

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const sendErroProd = (err, res) => {
  console.log(err);
  // operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming or other unknown error: don't leak error detail
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (err.parent?.code === '22001') error = handleCastError22001();

    sendErroProd(error, res);
  }
};

module.exports = globalErrorHandler;

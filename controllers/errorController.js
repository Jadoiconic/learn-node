const AppError = require("../utils/appError");

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = ()=> new AppError('Invalid token, please login again',401)
const handleValidationErrorDB = () => new AppError('Connection failed, please try again',401)
const handleDuplicateFieldsDB = () => new AppError(`Your email have been taken`,401)
const handleTokenExpiredError = () => new AppError(`Your Token have been expired, please login again`,401)

const sendErrorForDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorForProduction = (error, res) => {
  // console.log(error)
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: `Ivanlid ${error.path}: ${error.keyValue}`,
    });
  }
};

module.exports = (error, req, res, next) => {
  // console.log(error.stack);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(error, res);
    console.log(error.code)
  } else {
    let err = { ...error };
    console.log(err.path, err.value);
    if (err.name === "CastError") err = handleCastErrorDb(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
    if (err.code === 11000) err = handleDuplicateFieldsDB();
    // console.log(err)
    sendErrorForProduction(err, res);
  }
};

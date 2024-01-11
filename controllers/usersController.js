const Users = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    status: "Success",
    data: { users },
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error when a user POSTs password
  if(req.body.password || req.body.passwordConfirm) return next(new AppError("This route is not for password updates!",401))

  // 2. Update user Documents
});

const getAllUserById = catchAsync(async (req, res) => {
  console.log(req.query);
  const user = await Users.findById(req.body.q);
  res.status(200).json({
    status: "Sucess",
    data: user,
  });
});
const updateUserById = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};
const deleteUserById = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};

module.exports = {
  getAllUsers,
  getAllUserById,
  updateUserById,
  deleteUserById,
  createUser,
};

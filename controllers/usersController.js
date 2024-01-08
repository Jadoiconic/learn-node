const Users = require("../models/userModel");
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
const getAllUserById = catchAsync(async (req, res) => {
  console.log(req.query)
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

const express = require("express");
const {
  getAllUsers,
  createUser,
  getAllUserById,
  updateUserById,
  deleteUserById,
  checkBody,
} = require("../controllers/usersController");

const UsersRouter = express.Router();

UsersRouter.route("/").get(getAllUsers).post(checkBody, createUser);
UsersRouter.route("/:q")
  .get(getAllUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = UsersRouter;

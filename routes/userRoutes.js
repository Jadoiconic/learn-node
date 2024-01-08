const express = require("express");
const {
  getAllUsers,
  getAllUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersController");
const {
  signup,
  login,
  forgotPassword,
  resettPassword,
} = require("../controllers/authController");

const UsersRouter = express.Router();

UsersRouter.post("/signup", signup);
UsersRouter.post("/login", login);

UsersRouter.post("/forgot", forgotPassword);
UsersRouter.post("/reset", resettPassword);

UsersRouter.route("/").get(getAllUsers);
UsersRouter.route("/:q")
  .get(getAllUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = UsersRouter;

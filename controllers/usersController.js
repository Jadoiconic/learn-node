const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.email) return res.status(505).json({
      status:"error",
      message:"Missing params"
    });
    next()
  };
const createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};
const getAllUserById = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This routes is not defined!",
  });
};
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
  checkBody,
};

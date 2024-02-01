const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


const createNew = Model => catchAsync(async (req, res, next) => {
    const newReviw = await Model.create(req.body);
    if (!newReviw) return next(new AppError("Review failed to be created!", 401));
    res.status(200).json({
      status: "Sucess",
      data: { newReviw },
    });
  });
const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.q;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError(`There is no doc with this ${id} ID`, 404));
    }
    res.status(200).json({
      status: "success",
      message: 'You successfuly Delete Doc with id "' + id + '"',
    });
  });

module.exports = { deleteOne, createNew };

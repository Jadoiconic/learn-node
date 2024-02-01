const Reviews = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { deleteOne, createNew } = require("./handleFactory");

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Reviews.find();
  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { reviews },
  });
});

// const createReview = catchAsync(async (req, res, next) => {
//   const newReviw = await Reviews.create(req.body);
//   if (!newReviw) return next(new AppError("Review failed to be created!", 401));
//   res.status(200).json({
//     status: "Sucess",
//     data: { newReviw },
//   });
// });

const createReview = createNew(Reviews);
const deleteReview = deleteOne(Reviews);

module.exports = { getAllReviews, createReview, deleteReview };

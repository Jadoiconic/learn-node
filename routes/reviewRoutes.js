const express = require("express");
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviewController");
const { protectRoute, restrictTo } = require("../controllers/authController");

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(protectRoute, restrictTo, getAllReviews)
  .post(protectRoute, restrictTo, createReview);
reviewRouter
  .route("/")
  .get(protectRoute, restrictTo, getAllReviews)
  .post(protectRoute, restrictTo, createReview);

module.exports = reviewRouter;

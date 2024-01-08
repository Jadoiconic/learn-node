const express = require("express");
const {
  getToursById,
  updateTourById,
  deleteTourById,
  getAllTours,
  createTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protectRoute, restrictTo } = require("../controllers/authController");

const TourRouter = express.Router();
TourRouter.route('/top-5-tours').get(aliasTopTours,getAllTours)
TourRouter.route('/tour-stats').get(getTourStats)
TourRouter.route('/monthly-plan/:year').get(getMonthlyPlan)

TourRouter.route("/").get(protectRoute, restrictTo('admin'), getAllTours).post(createTour);
TourRouter.route("/:q")
  .get(protectRoute, restrictTo('admin','lead-guide'),getToursById)
  .patch(protectRoute, restrictTo('admin','lead-guide'),updateTourById)
  .delete(protectRoute, restrictTo('admin','lead-guide'),deleteTourById);

module.exports = TourRouter;

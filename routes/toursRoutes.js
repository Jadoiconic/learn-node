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

const TourRouter = express.Router();
TourRouter.route('/top-5-tours').get(aliasTopTours,getAllTours)
TourRouter.route('/tour-stats').get(getTourStats)
TourRouter.route('/monthly-plan/:year').get(getMonthlyPlan)

TourRouter.route("/").get(getAllTours).post(createTour);
TourRouter.route("/:q")
  .get(getToursById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = TourRouter;

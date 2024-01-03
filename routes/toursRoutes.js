const express = require("express");
const {
  getToursById,
  updateTourById,
  deleteTourById,
  getAllTours,
  createTour,
  aliasTopTours,
} = require("../controllers/tourController");

const TourRouter = express.Router();
TourRouter.route('/top-5-tours').get(aliasTopTours,getAllTours)
TourRouter.route("/").get(getAllTours).post(createTour);
TourRouter.route("/:q")
  .get(getToursById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = TourRouter;

const express = require("express");
const {
  getToursById,
  updateTourById,
  deleteTourById,
  getAllTours,
  createTour,
} = require("../controllers/tourController");

const TourRouter = express.Router();
TourRouter.route("/").get(getAllTours).post(createTour);
TourRouter.route("/:q")
  .get(getToursById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = TourRouter;

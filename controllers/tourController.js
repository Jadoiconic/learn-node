// const fs = require("fs");
const Tour = require("../models/tourModel");
const APIFeature = require("../utils/apiFeatures");

// reading a file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-price";
  req.query.fields = "name,summary,description,price,difficulty";
  next();
};

const getAllTours = async (req, res) => {
  try {
    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitfields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: "Success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: error,
    });
  }
};
const getToursById = async (req, res) => {
  const id = req.params.q;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: "Success",
      requestedAt: req.requestTime,
      results: data.length,
      data: { data },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: error,
    });
  }
};

// create a tour
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Success",
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
  // const newTour = new Tour(req.body);
  // newTour.save().then((res) => {
  //   console.log(res);
  // });
};

//   Update method

const updateTourById = async (req, res) => {
  const id = req.params.q;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: { updatedTour },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const deleteTourById = async (req, res) => {
  const id = req.params.q;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: 'You successfuly Delete Tour with id "' + id + '"',
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numberOfTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRatings: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      // { $match: {_id: {$ne: "EASY" }} },
    ]);
    res.status(200).json({
      status: "Success",
      stats,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      // {
      //   $match: {
      //     startDates: {
      //       // $gte: new Date(`${year}-01-01`),
      //       // $lte: new Date(`${year}-12-31`),
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     _id: { $month: "$startDates" },
      //     numberOfToursStarts: { $sum: 1 },
      //     tournNames:{$push:'$name'}
      //   },
      // },
    ]);

    res.status(200).json({
      status: "Success",
      plan,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  getAllTours,
  getToursById,
  updateTourById,
  deleteTourById,
  createTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};

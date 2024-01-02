// const fs = require("fs");
const Tour = require("../models/tourModel");

// reading a file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

const getAllTours = async (req, res) => {
  try {
    const quieryObj = {...req.query}
    const excludedFields = ['sort','limit','page','fields']
    excludedFields.forEach(el=> delete quieryObj[el])
    const query = Tour.find(quieryObj)
    // const query = Tour.find().where('duration').equals(9)

    const tours = await query;

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

module.exports = {
  getAllTours,
  getToursById,
  updateTourById,
  deleteTourById,
  createTour,
};

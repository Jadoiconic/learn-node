// const fs = require("fs");
const Tour = require("../models/tourModel");

// reading a file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-price";
  req.query.fields = "name,summary,description,price,difficulty";
  next();
};

class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const quieryObj = { ...this.queryString };
    const excludedFields = ["sort", "limit", "page", "fields"];
    excludedFields.forEach((el) => delete quieryObj[el]);

    // Advanced Filtering
    let queryStr = JSON.stringify(quieryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    this.query = Tour.find(queryStr);

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("name");
    }
    return this
  }

  limitfields(){
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this
  }
  paginate(){
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this
  }
}
const getAllTours = async (req, res) => {
  try {
    // filterting
    // const quieryObj = { ...req.query };
    // const excludedFields = ["sort", "limit", "page", "fields"];
    // excludedFields.forEach((el) => delete quieryObj[el]);

    // // Advanced Filtering
    // let queryStr = JSON.stringify(quieryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // queryStr = JSON.parse(queryStr);

    // let query = Tour.find(queryStr);
    // // const query = Tour.find().where('duration').equals(9)

    // // Sorting data

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("name");
    // }

    // // fields limiting

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }
    // // Pagenation
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 5;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numerOfTours = await Tour.countDocuments();
    //   if (skip >= numerOfTours) throw new Error("This page does not exist!");
    // }
    // Execute Query 
    const features = new APIFeature(Tour.find(), req.query).filter().sort().limitfields().paginate();
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

module.exports = {
  getAllTours,
  getToursById,
  updateTourById,
  deleteTourById,
  createTour,
  aliasTopTours,
};

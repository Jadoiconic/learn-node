const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


const createNew = Model => catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    if (!data) return next(new AppError("Review failed to be created!", 401));
    res.status(200).json({
      status: "Sucess",
      data: { data },
    });
  });

const getOne = (Model,populateOptions) => catchAsync(async (req, res, next) => {
    const id = req.params.q;
    let query = await Model.findById(id);
    if(populateOption) query = query.populate(populateOptions)
    // const doc = await query.explain();
    const doc = await query;

    if (!doc) {
      return next(new AppError(`There is no document with this ${id} ID`, 404));
    }
    res.status(200).json({
      status: "Success",
      requestedAt: req.requestTime,
      data: { doc },
    });
  });

  const updateOne = (Model) => catchAsync(async (req, res, next) => {
    const id = req.params.q;
    const updatedDoc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDoc) {
      return next(new AppError(`There is no document with this ${id} ID`, 404));
    }
    res.status(200).json({
      status: "Success",
      data: { updatedDoc },
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

module.exports = { deleteOne, createNew, getOne, updateOne };

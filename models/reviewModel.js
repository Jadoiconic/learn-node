const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: {
        type: String,
        require: [true, "Must have review"],
      },
    },
  },
  {
    rating: {
      type: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        require: [true, "Review must belong to a tour"],
      },
    ],
  },
  {
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        require: [true, "Review must belong to a user"],
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tour",
    select: "-__v name",
  }).populate({
    path:"user",
    select:"name"
  });
  next();
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;

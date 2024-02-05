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

// Avoiding duplicate review
reviewSchema.index({tour:1,user:1}, {unique:true})

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tour",
    select: "-__v name",
  }).populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.post("save", async function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await Tour.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;

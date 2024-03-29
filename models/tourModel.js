const mongoose = require("mongoose");
const slug = require("slug");

// schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a tour must have name"],
      trim: true,
      maxlength: [40, "name must have not more than 40 characters"],
      minlength: [5, "name must have at least 5 chacters"],
    },
    summary: {
      type: String,
    },
    maxGroupSize: Number,
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    price: {
      type: Number,
      // validate: {
      //   validator: {
      //     function(val) {
      //       return val < 50;
      //     },
      //   },
      //   message: "Price of {VALUE} must be higer than 50",
      // },
    },
    duration: {
      type: Number,
      required: [true, "a tour must have age"],
      // select:false
    },
    ratingsAverage: {
      type: Number,
    },
    ratingsQuantity: Number,
    startDates: Array,
    description: String,
    locations: Array,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//! // Document Middleware

// tourSchema.pre("save", function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// tourSchema.post('save',function(doc,next){
//   console.log(doc)
// next()
// })

//! // Query middleware
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
// this.start = Date. now() ;
//   next();
// });

// tourSchema.post(/^find/,function(docs,next){
// console.log(`Query took ${Date.now() - this.start} milliseconds`)
//   next()
// })

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

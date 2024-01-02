const mongoose = require("mongoose");

// schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a tour must have name"],
    trim: true,
  },
  summary: {
    type: String,
  },
  maxGroupSize: Number,
  difficulty: String,
  price: Number,
  duration: {
    type: Number,
    required: [true, "a tour must have age"],
  },
  description: String,
  locations: Array,
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

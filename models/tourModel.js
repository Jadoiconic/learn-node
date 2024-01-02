
const mongoose = require("mongoose")

// schema
const tourSchema = new mongoose.Schema({
    name:{
      type:String,
      // required:[true,'a tour must have name'],
      trim:true
    },
    summary: {
      type:String,
    },
    duration:{
      type:Number,
      // required:[true,'a tour must have age']
    },
    description:String
  })
  
  const Tour = mongoose.model('Tour',tourSchema)
  
module.exports = Tour
  

const mongoose = require("mongoose")

// schema
const tourSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required:[true,'a tour must have first name'],
      trim:true
    },
    lastName:{
      type:String,
      required:[true,'a tour must have first name'],
      trim:true
    },
    summary: {
      type:String,
    },
    age:{
      type:Number,
      required:[true,'a tour must have age']
    },
    description:String
  })
  
  const Tour = mongoose.model('Tour',tourSchema)
  
module.exports = Tour
  
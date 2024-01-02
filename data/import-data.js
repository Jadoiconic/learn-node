const fs = require("fs")
const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);


// Database connection
  mongoose.connect(db).then(()=>console.log('Connection successful!'));

//   Read JSON file
const tours = fs.readFileSync('tours.json','utf-8')

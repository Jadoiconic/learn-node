const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("../models/tourModel");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Database connection
mongoose.connect(db).then(() => console.log(""));

//   Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
console.log(tours)

const importData = async () => {
  try {
    await Tour.create(tours.data);
    console.log("Data successfuly loaded!");
    process.exit()
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfuly deleted!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

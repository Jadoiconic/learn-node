const express = require("express");
const morgan = require("morgan");
const UsersRouter = require("./routes/userRoutes");
const TourRouter = require("./routes/toursRoutes");

const app = express();


// Middlewares
app.use(morgan("dev"));
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("Hello from middleware");
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  next();
});

//  Mounting Routers
app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/users", UsersRouter);


module.exports = app
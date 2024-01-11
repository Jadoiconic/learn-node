const express = require("express");
const morgan = require("morgan");
const UsersRouter = require("./routes/userRoutes");
const TourRouter = require("./routes/toursRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController")

const app = express();

// Middlewares

process.env.NODE_ENV === "develoment" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  // console.log(req.headers)
  next();
});

//  Mounting Routers
app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/users", UsersRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler); 

module.exports = app;

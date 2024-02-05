const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path")

const UsersRouter = require("./routes/userRoutes");
const TourRouter = require("./routes/toursRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// Global Middlewares
// Set security HTTP headers
app.use(helmet());
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname,'views')))

process.env.NODE_ENV === "develoment" && app.use(morgan("dev"));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});


app.use("/api", limiter);

// Body parser, reading data from body into  req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent prament pollution
app.use(
  hpp({
    whitelist: ["sort", "duration", "price", "difficulty", "ratingAverage"],
  })
);

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  // console.log(req.headers)
  next();
});

//  Mounting Routers
app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

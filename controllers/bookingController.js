const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("../models/tourModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const {} = require("./handleFactory");

const getCheckOutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour)
    return next(
      new AppError("The tour you are trying not found, try with onter one", 500)
    );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.user.email,
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slag}`,
    // cancel_url: "http://localhost:6000/cancel",
    client_refenece_id: req.params.tourId,
    line_items: {
      name: `${tour.name} Tour`,
      description: tour.summary,
      images: [`https://domain.com/images/${tour.imageCover}`],
      amount: tour.price * 100,
      currency: "usd",
      quantity: 1,
    },
  });

  res.status(200).json({
    status: "Success",
    session,
  });
});

module.exports = { getCheckOutSession };

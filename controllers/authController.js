const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("../utils/email");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await Users.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "Success",
    token,
    user: newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

const protectRoute = catchAsync(async (req, res, next) => {
  // 1. get token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. verification of token
  if (!token) {
    return next(new AppError("You are not loged in, Please login", 401));
  }
  // 3. check if user still exists
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const currentUser = await Users.findById(decodedPayload.id);
  if (!currentUser)
    return next(
      new AppError("The user belonging to this token does not exist!", 401)
    );
  //! 4. check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decodedPayload.iat)) {
    return next(new AppError("User password have been changed!", 401));
  }
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permision to perform this action", 403)
      );
    }
    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on Posted email
  const user = await Users.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError("There is no user with this email!", 404));
  // 2. Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send it to a user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset/${resetToken}`;

  try {
    const message = `Forgot your password? Submit a new password and passwordConfirm to ${resetURL} . If you didn't forgot your password, ignore this message`;
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token (Valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "Success",
      message: "Your reset token sent to your email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordRestTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error while sending email, Try again later!",
        500
      )
    );
  }
});

const resettPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Users.findOne({
    passwordResetToken: hashedToken,
    passwordRestTokenExpire: { $gte: Date.now() },
  });
  // 2. If token has not expired and there is a user, set new password

  if (!user)
    return next(new AppError("Invalid token or token has been expired!", 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordRestTokenExpire = undefined;
  await user.save();

  // 3. Update passwordChangedAt property for the user

  // 4. Log the user in,  send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = Users.findById(req.user._id).select("+password");

  // 2. Check if current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(
      new AppError("Your current password is incorrect, Please try again!", 401)
    );

  // 3. If so, update Password
  user.password = req.body.password;
  user.passwordConfirm = req.passwordConfirm;
  await user.save();

  // 4. Log user in and send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

const deleteMyAccount = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
module.exports = {
  signup,
  login,
  protectRoute,
  restrictTo,
  forgotPassword,
  resettPassword,
  updatePassword,
  deleteMyAccount,
};

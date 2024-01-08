const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have name"],
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a Valid Email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlenght: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password does not match!",
    },
  },
  passwordResetToken: String,
  passwordRestTokenExpire: Date,
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordRestTokenExpire = Date.now() + 10 * 60 * 1000;
  // console.log(resetToken, this.passwordResetToken);

  return resetToken;
};

userSchema.methods.changePasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimeStamp, JWTTimestamp);
    // return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;

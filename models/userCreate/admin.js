const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
    default: "tom",
  },
  lastName: {
    type: String,
    // required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
    default: "test",
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    // validate: {
    //   validator: validator.isEmail,
    //   message: 'Please provide valid email',
    // },
    unique: true,
  },
  // verificationToken: String,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userType: {
    type: String,
    immutable: true,
    default: "user",
  },
  hashrate: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Admin", UserSchema);

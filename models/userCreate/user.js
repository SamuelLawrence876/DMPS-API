const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "user name must be provided"],
    trim: true,
    maxlength: [30, "name can not be more than 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "user must be provided"],
    maxlength: [30, "name can not be more than 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    trim: true,
    maxlength: [30, "name can not be more than 20 characters"],
  },
  status: {
    type: String,
    // required: [true, "status must be provided"],
    trim: true,
  },
  hashrate: {
    type: Number,
    // required: [true, "hashrate must be provided"],
  },
  amount: {
    type: Number,
    default: false,
    // required: [true, "amount must be provided"],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  userType: {
    type: String,
    immutable: true,
    default: "user",
  },
});

module.exports = mongoose.model("records", userSchema);

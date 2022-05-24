const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "user name must be provided"],
  },
  lastName: {
    type: String,
    required: [true, "user must be provided"],
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userType: {
    type: Date,
    immutable: true,
    default: "admin",
  },
});

module.exports = mongoose.model("User", userSchema);

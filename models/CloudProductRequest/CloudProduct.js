const mongoose = require("mongoose");

const CloudProduct = new mongoose.Schema({
  FullName: {
    type: String,
  },
  Email: {
    type: String,
  },
  price: {
    type: Number,
  },
  wallet: {
    type: Number,
  },
  discount: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CloudProduct", CloudProduct);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: [true, "product name must be provided"],
  },
  image: {
    type: String,
    default: "https://source.unsplash.com/random/1",
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  productDescription: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  discount: {
    type: Number,
    default: null,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productType: {
    type: String,
    enum: {
      values: ["bitcoin", "cables", "utility", "miners"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  productImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["music", "clothes"],
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;

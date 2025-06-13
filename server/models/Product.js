const mongoose = require("mongoose");
const { MAX_IMAGES_LIMIT } = require("../constants");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      typr: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
      max: 1000000,
    },
    stockQty: {
      type: Number,
      default: 1,
      min: 0,
      max: 1000,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isSale: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      validate: [
        (arr) => arr.length <= MAX_IMAGES_LIMIT,
        "limit of images mustn't exceed 5",
      ],
    },
  },
  { timeseries: true }
);

productSchema.index({ title: 1, category: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

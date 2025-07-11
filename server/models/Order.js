const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
          min: 0.01,
          max: 1000000,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
          max: 1000,
        },
      },
    ],

    shippingMethod: {
      type: String,
      enum: CONSTANTS.SHIPPING_METHOD,
      default: CONSTANTS.SHIPPING_METHOD[0],
    },
    shippingAdress: {
      type: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalSum: {
      //виключно ціна товарів, без доставки
      type: Number,
      required: true,
      min: 0.01,
    },
    status: {
      type: String,
      enum: CONSTANTS.ORDER_STATUS,
      default: CONSTANTS.ORDER_STATUS[0],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

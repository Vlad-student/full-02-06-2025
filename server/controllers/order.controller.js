const createError = require("http-errors");
const Product = require("../models/Product");
const Order = require("../models/Order");

module.exports.createOrder = async (req, res, next) => {
  try {
    const {
      products,
      customerPhone,
      shippingAdress,
      shippingMethod,
      shippingPrice,
    } = req.body;

    let totalSum = 0;

    const productsValidated = await Promise.all(
      products.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) {
          throw createError(404, "Product not found");
        }
        if (product.stockQty < quantity) {
          throw createError(
            409,
            "we don`t have enough products at these category" + product.title
          );
        }
        product.stockQty -= quantity;
        await product.save();
        totalSum += product.price * quantity;
        return {
          productId,
          productPrice: product.price,
          quantity,
        };
      })
    );

    const order = await Order.create({
      user: req.user._id,
      products: productsValidated,
      customerPhone,
      shippingAdress,
      shippingMethod,
      shippingPrice,
      totalSum,
    });
    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllOrders = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const orders = await Order.find()
      .populate("user", "email login")
      .populate("products.productId", "title")
      .limit(limit)
      .skip(skip);
    res.status(200).send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getAccountOrders = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const orders = await Order.find({ user: req.user._id })
      .populate("products.productId", "title")
      .skip(skip)
      .limit(limit);

    res.status(200).send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "email")
      .populate("products.productId", "title");
    if (!order) {
      throw createError(404, "Order not found");
    }
    if (req.user.role !== "admin") {
      if (req.user._id.toString() !== order.user._id.toString()) {
        throw createError(403, "Permision denided");
      }
    }
    res.status(200).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const orderStatus = await Order.findById(req.params.orderId);
    if (!orderStatus) {
      throw createError(404, "Not found");
    }
    orderStatus.status = status;
    await orderStatus.save();
    res.status(200).send({ data: orderStatus });
  } catch (error) {
    next(error);
  }
};

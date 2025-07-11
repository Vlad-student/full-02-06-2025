const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth.mv");
const { validate } = require("../middlewares/validate.mv");
const { createOrderSchema, updateStatusOrderSchema } = require("../validators/order.validator");
const {
  createOrder,
  getAllOrders,
  getAccountOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { paginate } = require("../middlewares/pagination.mv");
const { filterOrders } = require("../middlewares/filter.mv");

const router = express.Router();

router.post("/", auth, validate(createOrderSchema), createOrder);
router.get("/", auth, isAdmin, paginate, filterOrders, getAllOrders);
router.get("/account", auth, paginate, getAccountOrders);
router.get("/:orderId", auth, getOrderById);
router.patch(
  "/:orderId",
  auth,
  isAdmin,
  validate(updateStatusOrderSchema),
  updateOrderStatus
);

module.exports = router;

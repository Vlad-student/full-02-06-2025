const express = require("express");
const { auth, isAdmin, canUpdateOrderStatus } = require("../middlewares/auth.mv");
const { validate } = require("../middlewares/validate.mv");
const {
  createOrderSchema,
  updateStatusOrderSchema,
} = require("../validators/order.validator");
const {
  createOrder,
  getAllOrders,
  getAccountOrders,
  getOrderById,
  updateOrderStatus,
  createCheckoutSession,
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
  canUpdateOrderStatus,
  validate(updateStatusOrderSchema),
  updateOrderStatus
);

router.post("/create-checkout-session", createCheckoutSession);
module.exports = router;

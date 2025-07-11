const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth.mv");
const { validate } = require("../middlewares/validate.mv");
const { createOrderSchema } = require("../validators/order.validator");
const {
  createOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const paginate = require("../middlewares/pagination.mv");
const { filterOrders } = require("../middlewares/filter.mv");

const router = express.Router();

router.post("/", auth, validate(createOrderSchema), createOrder);
router.get("/", auth, isAdmin, paginate, filterOrders, getAllOrders);

module.exports = router;

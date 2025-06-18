const express = require("express");
const upload = require("../middlewares/uploadImage.mv");
const { auth, isAdmin } = require("../middlewares/auth.mv");
const { validate } = require("../middlewares/validate.mv");
const CONSTANTS = require("../constants");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/product.controller");
const { paginate } = require("../middlewares/pagination.mv");

const router = express.Router();

router.post(
  "/",
  auth,
  isAdmin,
  upload.array("images", CONSTANTS.MAX_IMAGES_LIMIT),
  validate(createProductSchema),
  createProduct
);

router.get("/", paginate, getAllProducts);
router.get("/:idProduct", getProductById);
router.patch(
  "/:idProduct",
  auth,
  isAdmin,
  upload.array("images", CONSTANTS.MAX_IMAGES_LIMIT),
  validate(updateProductSchema),
  updateProduct
);

module.exports = router;

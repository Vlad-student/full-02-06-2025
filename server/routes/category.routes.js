const { isAdmin, auth } = require("../middlewares/auth.mv");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
const { validate } = require("../middlewares/validate.mv");
const { createCategorySchema } = require("../validators/category.validation");

const express = require("express");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:idCategory", getCategoryById);
router.patch(
  "/:idCategory",
  auth,
  isAdmin,
  validate(createCategorySchema),
  updateCategory
);
router.delete("/:idCategory", auth, isAdmin, deleteCategoryById);

router.post("/", auth, isAdmin, validate(createCategorySchema), createCategory);

module.exports = router;
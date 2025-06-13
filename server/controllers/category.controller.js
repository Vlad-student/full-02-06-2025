const createError = require("http-errors");
const Category = require("../models/Category");

module.exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send({ data: category });
  } catch (error) {
    console.log("createCategory --->>>", error);
    if (error.code === 11000) {
      return next(
        createError(409, "Category with this name is already exists")
      );
    }
    next(error);
  }
};

module.exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ data: categories });
  } catch (error) {
    next(error);
  }
};

module.exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.idCategory);
    if (!category) {
      return res.status(400).send("Categorynot found");
    }
    res.status(200).send({ data: category });
  } catch (error) {
    next(error);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  try {
    const { idCategory } = req.params;
    const category = await Category.findByIdAndUpdate(idCategory, req.body, {
      new: true,
    });
    if (!category) {
      throw createError(404, "category not found");
    }
    res.status(200).send({ data: category });
  } catch (error) {
    if (error.code === 11000) {
      return next(createError(409, "category already exists"));
    }
    next(error);
  }
};

module.exports.deleteCategoryById = async (req, res, next) => {
  try {
    const { idCategory } = req.params;
    const category = await Category.findByIdAndDelete(idCategory);
    if (!category) {
      return createError(404, "category not found");
    }
    res.status(200).send({ data: category });
  } catch (error) {
    next(error);
  }
};

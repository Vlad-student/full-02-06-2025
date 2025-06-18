const Yup = require("yup");
const CONSTANTS = require("../constants");

const titleSchema = Yup.string().trim().min(3).max(255);
const priceSchema = Yup.number().positive().max(10000000);
const stockQtyShema = Yup.number().min(0).max(10000).default(1);

module.exports.createProductSchema = Yup.object({
  title: titleSchema.required(),
  description: Yup.string().trim(),
  price: priceSchema.required(),
  stockQty: stockQtyShema,
  category: Yup.string().trim().min(3).max(255).required(),
  isSale: Yup.boolean(),
});

module.exports.updateProductSchema = Yup.object({
  title: titleSchema,
  description: Yup.string().trim(),
  price: priceSchema,
  stockQty: stockQtyShema,
  category: Yup.string().trim().min(3).max(255),
  isSale: Yup.boolean(),
});

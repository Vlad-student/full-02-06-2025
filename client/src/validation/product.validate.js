import * as yup from "yup";

const titleSchema = yup.string().trim();
const descriptionSchema = yup.string().trim();
const priceSchema = yup.number().positive().max(1000000);
const stockQtySchema = yup.number().min(0).max(1000);

export const productCreateSchema = yup.object({
  title: titleSchema.required(),
  description: descriptionSchema.required(),
  price: priceSchema.required(),
  stockQty: stockQtySchema,
  category: yup.string().required(),
});

export const productUpdateSchema = yup.object({
  title: titleSchema,
  description: descriptionSchema,
  price: priceSchema,
  stockQty: stockQtySchema,
  category: yup.string(),
});

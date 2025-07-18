import * as yup from "yup";

const emailSchema = yup.string().trim().email().required();
const passwordSchema = yup
  .string()
  .trim()
  .min(5)
  .required("Пароль обов'язковий");

export const loginValidateSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerValidateSchema = yup.object({
  login: yup.string().trim().min(5).max(255).required(),
  email: emailSchema,
  password: passwordSchema,
});

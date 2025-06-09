const Yup = require("yup");
const CONSTANTS = require("../constants");

const emailShema = Yup.string().trim().email().required();
const passwordShema = Yup.string().trim().min(8).max(255).required();

module.exports.registerShema = Yup.object({
  login: Yup.string().trim().min(5).max(255).required(),
  email: emailShema,
  password: passwordShema,
  role: Yup.string().oneOf(CONSTANTS.USER_ROLES),
});

module.exports.loginShema = Yup.object({
  email: emailShema,
  password: passwordShema,
});

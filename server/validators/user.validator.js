const Yup = require("yup");
const CONSTANTS = require("../constants");

const emailShema = Yup.string().trim().email();
const passwordShema = Yup.string().trim().min(8).max(255);
const loginShema = Yup.string().trim().min(5).max(255);

module.exports.registerShema = Yup.object({
  login: loginShema.required(),
  email: emailShema.required(),
  password: passwordShema.required(),
  role: Yup.string().oneOf(CONSTANTS.USER_ROLES),
});

module.exports.loginShema = Yup.object({
  email: emailShema,
  password: passwordShema,
});

module.exports.updateShema = Yup.object({
  login: loginShema,
  email: emailShema,
  password: passwordShema,
});

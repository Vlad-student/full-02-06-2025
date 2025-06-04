const express = require("express");
const { registerShema } = require("../validators/user.validator");
const { registerUser } = require("../controllers/user.controller");
const { validate } = require("../middlewares/User");

const route = express.Router();

router.post("/register", validate(registerShema) ,registerUser);

module.exports = route;

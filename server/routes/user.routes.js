const express = require("express");
const { registerShema, loginShema } = require("../validators/user.validator");
const { registerUser, loginUser, getAccount } = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.mv");
const { auth } = require("../middlewares/auth.mv");

const router = express.Router();

router.post("/register", validate(registerShema), registerUser);
router.post("/login", validate(loginShema), loginUser);
router.get("/account", auth, getAccount);

module.exports = router;

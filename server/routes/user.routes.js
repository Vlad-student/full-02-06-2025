const express = require("express");
const {
  registerShema,
  loginShema,
  updateShema,
} = require("../validators/user.validator");
const {
  registerUser,
  loginUser,
  getAccount,
  getAllUsers,
  updateUser,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.mv");
const { auth, isAdmin, isOwner } = require("../middlewares/auth.mv");

const router = express.Router();

router.post("/register", validate(registerShema), registerUser);
router.post("/login", validate(loginShema), loginUser);
router.get("/account", auth, getAccount);
router.get("/", auth, isAdmin, getAllUsers);
router.patch("/:idUser", auth, isOwner, validate(updateShema), updateUser);

module.exports = router;

const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const userShema = new mongoose.Schema(
  {
    login: { type: String, required: true, minLength: 5, maxLength: 255 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, //hash password
    role: {
      type: String,
      enum: CONSTANTS.USER_ROLES,
      default: CONSTANTS.USER_ROLES[0],
    },
  },
  { timestamps: true }
);

// delete password

const User = mongoose.model("User", userShema);

module.exports = User;

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.auth = (req, res, next) => {
  try {
    const rowAuthorization = req.body.authorization;
    const token = rowAuthorization?.replace("Bearer", "").trim();
    if (!token) {
      throw createError(401, "Invalid data");
    }
  } catch (error) {
    console.log("auth error -->", error);
    next(createError(401, "Invalid data"));
  }
};

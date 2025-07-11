const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { JWT_SECRET } = require("../constants");
const User = require("../models/User");

module.exports.auth = async (req, res, next) => {
  try {
    const rowAuthorization = req.headers.authorization;
    const token = rowAuthorization?.replace("Bearer", "").trim();
    if (!token) {
      throw createError(401, "Invalid data");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error -->", error);
    next(createError(401, "Invalid data"));
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
   return next();
  }
  next(createError(403, "Onli admin"));
};

module.exports.isOwner = async (req, res, next) => {
  if (req.params.idUser === req.user._id.toString()) {
    return next();
  }
  next(createError(403, "Only owner"));
};

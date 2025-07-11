const CONSTANTS = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "27017",
  DB_NAME: "shop",
  USER_ROLES: ["customer", "admin"],
  JWT_SECRET:
    "b9f3e8b4a1f14927a8e85d34c94c7aef6e6bbec9871e0b7abf9d8c84bfcde219",
  JWT_EXPIRES: "7d",
  MAX_IMAGES_LIMIT: 3,
  UPLOAD_FOLDER: "uploads/",
  UPLOAD_IMG_TYPES: [".jpg", ".jpeg", ".png", ".webp"],
  AMOUNT: 50,
  SHIPPING_METHOD: ["Free", "NP", "UKP"],
  ORDER_STATUS: [
    "new",
    "payed",
    "confirmed",
    "on the way",
    "delivered",
    "canceled",
  ],
};

module.exports = CONSTANTS;

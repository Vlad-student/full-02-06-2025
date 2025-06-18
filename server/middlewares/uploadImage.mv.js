const path = require("path");
const multer = require("multer");
const {
  UPLOAD_FOLDER,
  MAX_IMAGES_LIMIT,
  UPLOAD_IMG_TYPES,
} = require("../constants");

const storage = multer.diskStorage({
  destination: UPLOAD_FOLDER,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname.toLowerCase());
  if (UPLOAD_IMG_TYPES.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("Only format: " + UPLOAD_IMG_TYPES.toString));
  }
};
const upload = multer({
  storage,
  limits: { files: MAX_IMAGES_LIMIT },
  fileFilter,
});

module.exports = upload;

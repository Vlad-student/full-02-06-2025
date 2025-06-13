const Yup = require("yup");

module.exports.createCategorySchema = Yup.object({
  name: Yup.string().trim().min(3).max(64).required(),
});

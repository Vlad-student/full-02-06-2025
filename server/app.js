const path = require("path");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const errorHandler = require("./errorHandler");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const orderRouter = require("./routes/order.routes");
const CONSTANTS = require("./constants");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, CONSTANTS.UPLOAD_FOLDER))
);

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use(errorHandler);

module.exports = app;

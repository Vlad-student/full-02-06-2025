const express = require("express");
const userRouter = require("./routes/user.routes");
const errorHandler = require("./errorHandler");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use(errorHandler);

module.exports = app;

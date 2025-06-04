const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  console.log("errorMessage -->", errorMessage);
  res.status(status).send({ errors: [errorMessage] });
};

module.exports = errorHandler;

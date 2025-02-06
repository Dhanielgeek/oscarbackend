function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || err,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  }

  module.exports = errorHandler
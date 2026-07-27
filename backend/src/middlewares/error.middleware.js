const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", {
    message: err.message,
    name: err.name,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    body: req.body,
  });
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
    data: null,
  });
};

export default errorMiddleware;

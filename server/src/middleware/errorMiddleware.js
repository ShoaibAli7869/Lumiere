export const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  console.error("ERROR CAUGHT:", err);
  res.status(status).json({
    success: false,
    message: err.message || "Server Error",
    stack: err.stack,
  });
};

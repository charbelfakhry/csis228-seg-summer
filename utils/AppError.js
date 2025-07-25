class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true; // Indicates that this is an operational error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

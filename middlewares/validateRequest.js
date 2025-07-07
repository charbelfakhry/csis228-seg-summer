const { validationResult } = require("express-validator")
const AppError = require("../utils/AppError");


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, throw an AppError with the first error message
        throw new AppError(errors.array()[0].msg, 400);
    }
    next(); // Proceed to the next middleware or route handler if validation passes
}

module.exports = validateRequest;

const {body} = require('express-validator');

exports.loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];

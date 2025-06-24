const { body, validationResult } = require('express-validator');

const userBodyUpdateValidation = [
    body('firstName')
        .optional()
        .isString()
        .withMessage('FirstName must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('FirstName cannot be empty or longer than 255 chars'),
    body('lastName')
        .optional()
        .isString()
        .withMessage('LastName must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('LastName cannot be empty or longer than 255 chars'),
    body('avatar')
        .optional()
        .isLength({ max: 255 })
        .withMessage('URL cannot be longer than 255 chars')
        .isURL()
        .withMessage('Avatar must be a valid URL'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password cannot be shorter than 8 chars')
        .isString()
        .withMessage('Password must be a string'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email must be valid')
        .isLength({ max: 255 })
        .withMessage('Email cannot be longer than 255 chars'),
    body('dob')
        .optional()
        .notEmpty()
        .withMessage('DateOfBirth cannot be empty')
        .isDate()
        .withMessage('DateOfBirth must be a valid date (year-month-day)'),
];

const userBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    userBodyUpdateValidation,
    userBodyUpdateValidator,
};

const { body, validationResult } = require('express-validator');

const addressBodyUpdateValidation = [
    body('street')
        .optional()
        .isString()
        .withMessage('Street must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Street cannot be empty or longer than 255 chars'),
    body('city')
        .optional()
        .isString()
        .withMessage('City must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('City cannot be empty or longer than 255 chars'),
    body('province')
        .optional()
        .isString()
        .withMessage('Province must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Province cannot be empty or longer than 255 chars'),
    body('cap')
        .optional()
        .isInt()
        .withMessage('CAP must be an integer number')
        .isLength({ min: 1, max: 255 })
        .withMessage('CAP cannot be empty or longer than 255 chars'),
    body('contact')
        .optional()
        .isInt()
        .withMessage('Contact must be an integer number')
        .isLength({ min: 10 })
        .withMessage('Contact minimum length is 10'),
];

const addressBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    addressBodyUpdateValidation,
    addressBodyUpdateValidator,
};

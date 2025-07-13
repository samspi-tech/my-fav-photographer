const { body, validationResult } = require('express-validator');

const workshopBodyValidation = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Title cannot be empty or longer than 255 chars'),
    body('body')
        .isString()
        .withMessage('Body must be a string')
        .isLength({ min: 1, max: 2550 })
        .withMessage('Body cannot be empty or longer than 2550 chars'),
    body('date')
        .isDate()
        .withMessage('Date must be valid')
        .notEmpty()
        .withMessage('Date is required'),
];

const workshopBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    workshopBodyValidation,
    workshopBodyValidator,
};

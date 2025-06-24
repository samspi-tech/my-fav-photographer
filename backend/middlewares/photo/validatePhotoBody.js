const { body, validationResult } = require('express-validator');

const photoBodyValidation = [
    body('photo')
        .isLength({ max: 255 })
        .withMessage('URL cannot be longer than 255 chars')
        .isURL()
        .withMessage('Photo must be a valid URL'),
    body('body')
        .optional()
        .isString()
        .withMessage('Body must be a string')
        .isLength({ min: 1, max: 2550 })
        .withMessage('Body cannot be empty or longer than 2550 chars'),
    body('tag')
        .optional()
        .isString()
        .withMessage('Tag must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Tag cannot be empty or longer than 255 chars'),
];

const photoBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    photoBodyValidation,
    photoBodyValidator,
};

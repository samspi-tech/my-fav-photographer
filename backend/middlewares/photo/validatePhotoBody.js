const { body, validationResult } = require('express-validator');

const photoBodyValidation = [
    body('photo')
        .isLength({ min: 1, max: 255 })
        .withMessage('URL is needed and cannot be longer than 255 chars')
        .isURL()
        .withMessage('Photo must be a valid URL'),
    body('body')
        .optional()
        .isString()
        .withMessage('Body must be a string')
        .isLength({ max: 2550 })
        .withMessage('Body cannot be longer than 2550 chars'),
    body('tag')
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

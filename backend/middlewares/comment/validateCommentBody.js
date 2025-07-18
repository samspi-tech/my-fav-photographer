const { body, validationResult } = require('express-validator');

const commentBodyValidation = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .isLength({ min: 1, max: 2550 })
        .withMessage('Comment cannot be empty or longer than 2550 chars'),
];

const commentBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    commentBodyValidation,
    commentBodyValidator,
};

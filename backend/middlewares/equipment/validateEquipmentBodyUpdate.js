const { body, validationResult } = require('express-validator');

const equipmentBodyUpdateValidation = [
    body('camera')
        .optional()
        .isString()
        .withMessage('Camera must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Camera cannot be empty or longer than 255 chars'),
    body('lens')
        .optional()
        .isString()
        .withMessage('Lens must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Lens cannot be empty or longer than 255 chars'),
    body('bag')
        .optional()
        .isString()
        .withMessage('Bag must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Bag cannot be empty or longer than 255 chars'),
    body('tripod')
        .optional()
        .isString()
        .withMessage('Tripod must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Tripod cannot be empty or longer than 255 chars'),
    body('other')
        .optional()
        .isString()
        .withMessage('Other must be a string')
        .isLength({ min: 1, max: 255 })
        .withMessage('Other cannot be empty or longer than 255 chars'),
];

const equipmentBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ ...errors });
    }
    next();
};

module.exports = {
    equipmentBodyUpdateValidation,
    equipmentBodyUpdateValidator,
};

const HTTPException = require('../index');

class InvalidOrMissingTokenException extends HTTPException {
    constructor(
        statusCode = 401,
        message = 'Please provide valid token',
        error = 'Invalid or missing token',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = InvalidOrMissingTokenException;

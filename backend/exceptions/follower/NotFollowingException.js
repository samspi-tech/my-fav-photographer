const HTTPException = require('../index');

class NotFollowingException extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'User is not following this photographer',
        error = 'Not following',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = NotFollowingException;

const HTTPException = require('../index');

class AlreadyFollowingException extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'User is already following this photographer',
        error = 'Follow already exists',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = AlreadyFollowingException;

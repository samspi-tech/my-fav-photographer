const HTTPException = require('../index');

class UserNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No user found in this collection',
        error = 'User not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = UserNotFoundException;

const HTTPException = require('../index');

class FollowNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'You are not following any photographer yet.',
        error = 'Following not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = FollowNotFoundException;

const HTTPException = require('../index');

class VoteAlreadyExistsException extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'You already voted this post',
        error = 'Post already voted',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = VoteAlreadyExistsException;

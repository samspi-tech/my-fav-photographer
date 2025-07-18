const HTTPException = require('../index');

class PostNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No posts found in this collection.',
        error = 'Post not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = PostNotFoundException;

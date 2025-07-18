const HTTPException = require('../index');

class VoteNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No vote found in this collection',
        error = 'Vote not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = VoteNotFoundException;

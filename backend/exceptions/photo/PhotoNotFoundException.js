const HTTPException = require('../index');

class PhotoNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No photo found in this collection',
        error = 'Photo not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = PhotoNotFoundException;

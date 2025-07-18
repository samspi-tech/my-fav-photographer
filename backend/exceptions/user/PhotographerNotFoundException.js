const HTTPException = require('../index');

class PhotographerNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No photographer found in this collection',
        error = 'Photographer not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = PhotographerNotFoundException;

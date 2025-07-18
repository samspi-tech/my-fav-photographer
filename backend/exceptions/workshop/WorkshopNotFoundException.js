const HTTPException = require('../index');

class WorkshopNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No workshops found in this collection.',
        error = 'Workshop not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = WorkshopNotFoundException;

const HTTPException = require('../index');

class AddressNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No address found in this collection',
        error = 'Address not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = AddressNotFoundException;

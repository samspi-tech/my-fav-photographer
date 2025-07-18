const HTTPException = require('../index');

class EquipmentNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No equipments found in this collection.',
        error = 'Equipment not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = EquipmentNotFoundException;

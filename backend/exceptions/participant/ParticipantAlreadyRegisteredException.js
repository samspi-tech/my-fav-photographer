const HTTPException = require('../index');

class ParticipantAlreadyRegisteredException extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'User is already registered to this workshop',
        error = 'Participant registered',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = ParticipantAlreadyRegisteredException;

const HTTPException = require('../index');

class ParticipantNotRegisteredException extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'User is not registered to this workshop',
        error = 'Participant not registered',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = ParticipantNotRegisteredException;

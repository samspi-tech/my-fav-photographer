const HTTPException = require('../index');

class PermissionDeniedException extends HTTPException {
    constructor(
        statusCode = 403,
        message = 'You are not allowed to perform this action',
        error = 'Permission denied',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = PermissionDeniedException;

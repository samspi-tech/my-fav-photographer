const PermissionDeniedException = require('../../exceptions/auth/PermissionDeniedException');

const checkPermission = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        const hasPermission = roles.includes(userRole);
        if (!hasPermission) throw new PermissionDeniedException();

        next();
    };
};

module.exports = checkPermission;

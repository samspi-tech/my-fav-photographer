const jwt = require('jsonwebtoken');
const PUBLIC_ROUTES = require('../../config/publicRoutes');
const InvalidOrMissingTokenException = require('../../exceptions/auth/InvalidOrMissingTokenException');

const verifiedToken = async (req, res, next) => {
    const isPublicRoute = PUBLIC_ROUTES.includes(req.path);
    if (isPublicRoute) return next();

    const token = req.cookies.token;
    if (!token) throw new InvalidOrMissingTokenException();

    try {
        req.user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = verifiedToken;

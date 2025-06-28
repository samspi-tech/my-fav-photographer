const jwt = require('jsonwebtoken');
const InvalidOrMissingTokenException = require('../../exceptions/auth/InvalidOrMissingTokenException');

const verifiedToken = async (req, res, next) => {
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

const authService = require('../services/auth.service');

const loginAuth = async (req, res, next) => {
    try {
        const { body } = req;
        const { email, password } = body;
        const { token } = await authService.loginAuth(email, password);

        const DAY_IN_MILLISECONDS = 86400000;
        const COOKIE_EXPIRES_IN = new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRES_IN * DAY_IN_MILLISECONDS,
        );

        const cookieOptions = {
            expires: COOKIE_EXPIRES_IN,
            httpOnly: true,
            sameSite: 'none',
        };
        if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;

        res.cookie('token', token, cookieOptions);

        res.status(200).send({
            statusCode: 200,
            message: 'Login successfully',
        });
    } catch (err) {
        next(err);
    }
};

const logoutAuth = async (req, res, next) => {
    try {
        const ONE_SECOND = 1000;
        const COOKIE_EXPIRES_IN = new Date(Date.now() + ONE_SECOND);

        const cookieOptions = {
            expires: COOKIE_EXPIRES_IN,
            httpOnly: true,
            sameSite: 'none',
        };

        res.cookie('token', 'loggedOut', cookieOptions);

        res.status(200).send({
            statusCode: 200,
            message: 'Logged out successfully',
        });
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const me = await authService.findMe(userId);

        res.status(200).send({
            statusCode: 200,
            me,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    loginAuth,
    logoutAuth,
    getMe,
};

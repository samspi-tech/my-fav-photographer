const authService = require('../services/auth.service');

const loginAuth = async (req, res, next) => {
    try {
        const { body } = req;
        const { email, password } = body;

        const { token } = await authService.loginAuth(email, password);

        res.writeHead(200, {
            'Set-Cookie': `token=${token}; HttpOnly`,
            'Access-Control-Allow-Credentials': 'true',
        }).send();
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
    getMe,
};

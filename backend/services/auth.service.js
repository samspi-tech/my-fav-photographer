const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');
const UserNotFoundException = require('../exceptions/user/UserNotFoundException');
const InvalidOrMissingPasswordException = require('../exceptions/auth/InvalidOrMissingPasswordException');

const loginAuth = async (email, password) => {
    const user = await UserSchema.findOne({ email });
    if (!user) throw new UserNotFoundException();

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidOrMissingPasswordException();

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN },
    );

    return { token };
};

const findMe = async (userId) => {
    const me = await UserSchema.findById(userId).select('-password');
    if (!me) throw new UserNotFoundException();

    return me;
};

module.exports = {
    loginAuth,
    findMe,
};

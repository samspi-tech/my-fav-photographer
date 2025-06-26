const UserSchema = require('../models/user');
const isArrayEmpty = require('../utils/isArrayEmpty');
const UserNotFoundException = require('../exceptions/user/UserNotFoundException');
const PhotographerNotFoundException = require('../exceptions/user/PhotographerNotFoundException');

const findUserById = async (userId) => {
    const user = await UserSchema.findById(userId);
    if (!user) throw new UserNotFoundException();

    return user;
};

const findAllUsers = async () => {
    const users = await UserSchema.find().populate('followers');
    if (isArrayEmpty(users)) throw new UserNotFoundException();

    return users;
};

const findAllPhotographers = async (firstName = '', lastName = '') => {
    const photographers = await UserSchema.find({
        role: 'photographer',
        firstName: {
            $regex: `${firstName}`,
            $options: 'i',
        },
        lastName: {
            $regex: `${lastName}`,
            $options: 'i',
        },
    });
    if (isArrayEmpty(photographers)) throw new PhotographerNotFoundException();

    return photographers;
};

const createUser = async (userBody) => {
    const newUser = new UserSchema(userBody);
    return await newUser.save();
};

const updateUser = async (userId, userBody) => {
    const option = { new: true };

    const userToUpdate = UserSchema.findByIdAndUpdate(userId, userBody, option);
    if (!userToUpdate) throw new UserNotFoundException();

    return userToUpdate;
};

const deleteUser = async (userId) => {
    const userToDelete = UserSchema.findByIdAndDelete(userId);
    if (!userToDelete) throw new UserNotFoundException();

    return userToDelete;
};

module.exports = {
    findUserById,
    findAllUsers,
    findAllPhotographers,
    createUser,
    updateUser,
    deleteUser,
};

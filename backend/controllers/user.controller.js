const userService = require('../services/user.service');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAllUsers();

        res.status(200).send({
            statusCode: 200,
            users,
        });
    } catch (err) {
        next(err);
    }
};

const getAllPhotographers = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.query;

        const photographers = await userService.findAllPhotographers(
            firstName,
            lastName,
        );

        res.status(200).send({
            statusCode: 200,
            photographers,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { body: userBody } = req;
        const newUser = await userService.createUser(userBody);

        res.status(201).send({
            statusCode: 201,
            message: 'User created successfully!',
            newUser,
        });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { body: userBody } = req;

        const updatedUser = await userService.updateUser(userId, userBody);

        res.status(200).send({
            statusCode: 200,
            message: 'User updated successfully!',
            updatedUser,
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await userService.deleteUser(userId);

        res.status(200).send({
            statusCode: 200,
            message: 'User deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getAllPhotographers,
    createUser,
    updateUser,
    deleteUser,
};

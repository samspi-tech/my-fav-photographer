const userService = require('../services/user.service');
const authService = require('../services/auth.service');

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

const getSinglePhotographer = async (req, res, next) => {
    try {
        const { photographerId } = req.params;

        const photographer = await authService.findMe(photographerId);

        res.status(200).send({
            statusCode: 200,
            photographer,
        });
    } catch (err) {
        next(err);
    }
};

const getAllPhotographers = async (req, res, next) => {
    try {
        const { fullName, page, pageSize } = req.query;

        const { photographers, totalPages, totalPhotographers } =
            await userService.findAllPhotographers(fullName, page, pageSize);

        res.status(200).send({
            statusCode: 200,
            photographers,
            totalPages,
            totalPhotographers,
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { body } = req;

        const { firstName, lastName } = body;
        const fullName = `${firstName} ${lastName}`;

        const userBody = {
            ...body,
            fullName,
        };

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
    getSinglePhotographer,
    getAllPhotographers,
    createUser,
    updateUser,
    deleteUser,
};

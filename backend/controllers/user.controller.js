const userService = require('../services/user.service');

const createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const newUser = await userService.createUser(body);

        res.status(201).send({
            statusCode: 201,
            newUser,
        });
    } catch (err) {
        next(err);
    }
};

const getAllPhotographers = async (req, res, next) => {
    try {
        const { username, page, pageSize } = req.query;

        const photographersData = await userService.findAllPhotographers(
            username,
            page,
            pageSize,
        );

        const { photographers, totalPages, totalPhotographers } =
            photographersData;

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

module.exports = {
    createUser,
    getAllPhotographers,
};

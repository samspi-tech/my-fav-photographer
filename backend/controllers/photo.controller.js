const photoService = require('../services/photo.service');

const getAllPhotos = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const photos = await photoService.findAllPhotos(userId);

        res.status(200).send({
            statusCode: 200,
            photos,
        });
    } catch (err) {
        next(err);
    }
};

const createPhoto = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = req.params;

        const photoBody = {
            ...body,
            user: userId,
        };

        const newPhoto = await photoService.createPhoto(userId, photoBody);

        res.status(201).send({
            statusCode: 201,
            message: 'Photo created successfully!',
            newPhoto,
        });
    } catch (err) {
        next(err);
    }
};

const updatePhoto = async (req, res, next) => {
    try {
        const { body: photoBody } = req;
        const { userId, photoId } = req.params;

        const updatedPhoto = await photoService.updatePhoto(
            userId,
            photoId,
            photoBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Photo updated successfully!',
            updatedPhoto,
        });
    } catch (err) {
        next(err);
    }
};

const deletePhoto = async (req, res, next) => {
    try {
        const { userId, photoId } = req.params;
        await photoService.deletePhoto(userId, photoId);

        res.status(200).send({
            statusCode: 200,
            message: 'Photo deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPhotos,
    createPhoto,
    updatePhoto,
    deletePhoto,
};

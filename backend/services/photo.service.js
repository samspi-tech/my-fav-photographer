const UserSchema = require('../models/user');
const PhotoSchema = require('../models/photo');
const isArrayEmpty = require('../utils/isArrayEmpty');
const userService = require('../services/user.service');
const PhotoNotFoundException = require('../exceptions/photo/PhotoNotFoundException');

const findAllPhotos = async (userId) => {
    const photos = await PhotoSchema.find({ user: userId });
    if (isArrayEmpty(photos)) throw new PhotoNotFoundException();

    return photos;
};

const createPhoto = async (userId, photoBody) => {
    const user = await userService.findUserById(userId);

    const newPhoto = new PhotoSchema(photoBody);
    const savedPhoto = await newPhoto.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { photo: savedPhoto } },
    );

    return savedPhoto;
};

const updatePhoto = async (userId, photoId, photoBody) => {
    const option = { new: true };
    const user = await userService.findUserById(userId);

    const photoToUpdate = await PhotoSchema.findOneAndUpdate(
        {
            user: user._id,
            _id: photoId,
        },
        photoBody,
        option,
    );
    if (!photoToUpdate) throw new PhotoNotFoundException();

    return photoToUpdate;
};

const deletePhoto = async (userId, photoId) => {
    const user = await userService.findUserById(userId);

    const photoToDelete = await PhotoSchema.findByIdAndDelete(photoId);
    if (!photoToDelete) throw new PhotoNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { photo: photoToDelete._id } },
    );

    return photoToDelete;
};

module.exports = {
    findAllPhotos,
    createPhoto,
    updatePhoto,
    deletePhoto,
};

const UserSchema = require('../models/user');
const PhotoSchema = require('../models/photo');
const isArrayEmpty = require('../utils/isArrayEmpty');
const userService = require('../services/user.service');
const { calcTotalPages, calcSkipPages } = require('../utils/pagination');
const PhotoNotFoundException = require('../exceptions/photo/PhotoNotFoundException');

const findAllPhotos = async (userId, tag = '', page = 1, pageSize = 9) => {
    const totalPhotos = await PhotoSchema.countDocuments();
    const totalPages = calcTotalPages(totalPhotos, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const photos = await PhotoSchema.find({
        user: userId,
        tag: {
            $regex: `${tag}`,
            $options: 'i',
        },
    })
        .limit(pageSize)
        .skip(skipPages);
    if (isArrayEmpty(photos)) throw new PhotoNotFoundException();

    return { photos, totalPages, totalPhotos };
};

const createPhoto = async (userId, photoBody) => {
    const user = await userService.findUserById(userId);

    const newPhoto = new PhotoSchema(photoBody);
    const savedPhoto = await newPhoto.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { photos: savedPhoto } },
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

const express = require('express');
const photo = express.Router();
const bodyValidation = require('../utils/validation');
const photoController = require('../controllers/photo.controller');
const { cloudUploadPhotos } = require('../middlewares/multer/index');
const cloudinaryController = require('../controllers/cloudinary.controller');

photo.get('/:userId/photos', photoController.getAllPhotos);
photo.post(
    '/create/:userId',
    bodyValidation('createPhoto'),
    photoController.createPhoto,
);
photo.post(
    '/cloud-upload/photos',
    cloudUploadPhotos.array('photos', 10),
    cloudinaryController.uploadPhotos,
);
photo.patch(
    '/update/:userId/photo/:photoId',
    bodyValidation('updatePhoto'),
    photoController.updatePhoto,
);
photo.delete('/delete/:userId/photo/:photoId', photoController.deletePhoto);

module.exports = photo;

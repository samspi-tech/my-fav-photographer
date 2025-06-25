const express = require('express');
const photo = express.Router();
const bodyValidation = require('../utils/validation');
const photoController = require('../controllers/photo.controller');

photo.get('/:userId/photos', photoController.getAllPhotos);
photo.post(
    '/create/:userId',
    bodyValidation('createPhoto'),
    photoController.createPhoto,
);
photo.patch(
    '/update/:userId/photo/:photoId',
    bodyValidation('updatePhoto'),
    photoController.updatePhoto,
);
photo.delete('/delete/:userId/photo/:photoId', photoController.deletePhoto);

module.exports = photo;

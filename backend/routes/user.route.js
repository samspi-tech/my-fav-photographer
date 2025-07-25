const express = require('express');
const user = express.Router();
const bodyValidation = require('../utils/validation');
const userController = require('../controllers/user.controller');
const { cloudUploadAvatar } = require('../middlewares/multer/index');
const checkPermission = require('../middlewares/auth/checkPermission');
const cloudinaryController = require('../controllers/cloudinary.controller');

user.get('/', checkPermission('admin'), userController.getAllUsers);
user.get(
    '/singlePhotographer/:photographerId',
    userController.getSinglePhotographer,
);
user.get('/photographers', userController.getAllPhotographers);
user.post('/create', bodyValidation('createUser'), userController.createUser);
user.post(
    '/cloud-upload/avatar',
    cloudUploadAvatar.single('avatar'),
    cloudinaryController.uploadAvatar,
);
user.patch(
    '/update/:userId',
    bodyValidation('updateUser'),
    userController.updateUser,
);
user.delete('/delete/:userId', userController.deleteUser);

module.exports = user;

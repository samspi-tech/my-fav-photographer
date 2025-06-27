const express = require('express');
const user = express.Router();
const bodyValidation = require('../utils/validation');
const imageCloudUpload = require('../middlewares/multer/index');
const userController = require('../controllers/user.controller');
const cloudinaryController = require('../controllers/cloudinary.controller');

user.get('/', userController.getAllUsers);
user.get('/photographers', userController.getAllPhotographers);
user.post('/create', bodyValidation('createUser'), userController.createUser);
user.post(
    '/cloud-upload/avatar',
    imageCloudUpload.single('avatar'),
    cloudinaryController.uploadFileOnCloudinary,
);
user.patch(
    '/update/:userId',
    bodyValidation('updateUser'),
    userController.updateUser,
);
user.delete('/delete/:userId', userController.deleteUser);

module.exports = user;

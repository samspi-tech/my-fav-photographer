const express = require('express');
const user = express.Router();
const bodyValidation = require('../utils/validation');
const userController = require('../controllers/user.controller');

user.get('/', userController.getAllUsers);
user.get('/photographers', userController.getAllPhotographers);
user.post('/create', bodyValidation('createUser'), userController.createUser);
user.patch(
    '/update/:userId',
    bodyValidation('updateUser'),
    userController.updateUser,
);
user.delete('/delete/:userId', userController.deleteUser);

module.exports = user;

const express = require('express');
const user = express.Router();
const userController = require('../controllers/user.controller');
const bodyValidation = require('../utils/validation');

user.get('/photographers', userController.getAllPhotographers);
user.post('/create', bodyValidation('createUser'), userController.createUser);

module.exports = user;

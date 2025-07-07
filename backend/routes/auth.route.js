const express = require('express');
const auth = express.Router();
const authController = require('../controllers/auth.controller');

auth.get('/me', authController.getMe);
auth.post('/login', authController.loginAuth);
auth.get('/logout', authController.logoutAuth);

module.exports = auth;

const express = require('express');
const follower = express.Router();
const followerController = require('../controllers/follower.controller');

follower.post(
    '/create/:followerId/photographer/:photographerId',
    followerController.createFollow,
);
follower.delete(
    '/delete/:followerId/photographer/:photographerId',
    followerController.deleteFollow,
);

module.exports = follower;

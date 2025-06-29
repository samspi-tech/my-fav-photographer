const express = require('express');
const follower = express.Router();
const checkPermission = require('../middlewares/auth/checkPermission');
const followerController = require('../controllers/follower.controller');

follower.get('/:followerId/following', followerController.getAllFollowing);
follower.get('/:photographerId/followers', followerController.getAllFollowers);
follower.post(
    '/create/:followerId/',
    checkPermission('user'),
    followerController.createFollow,
);
follower.delete(
    '/delete/:followerId/photographer/:photographerId',
    checkPermission('user'),
    followerController.deleteFollow,
);

module.exports = follower;

const express = require('express');
const follower = express.Router();
const followerController = require('../controllers/follower.controller');

follower.get('/:followerId/following', followerController.getAllFollowing);
follower.get('/:photographerId/followers', followerController.getAllFollowers);
follower.post('/create/:followerId/', followerController.createFollow);
follower.delete(
    '/delete/:followerId/photographer/:photographerId',
    followerController.deleteFollow,
);

module.exports = follower;

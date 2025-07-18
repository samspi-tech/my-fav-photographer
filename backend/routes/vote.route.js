const express = require('express');
const vote = express.Router();
const voteController = require('../controllers/vote.controller');

vote.post('/upvote/:postId', voteController.upVote);
vote.post('/downvote/:postId', voteController.downVote);
vote.delete('/delete/upvote/:postId/user/:userId', voteController.removeUpVote);
vote.delete(
    '/delete/downvote/:postId/user/:userId',
    voteController.removeDownVote,
);

module.exports = vote;

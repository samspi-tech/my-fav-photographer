const express = require('express');
const vote = express.Router();
const voteController = require('../controllers/vote.controller');

vote.post('/upvote/:postId', voteController.upVote);
vote.post('/downvote/:postId', voteController.downVote);
vote.delete('/delete/upvote/:postId', voteController.removeUpVote);
vote.delete('/delete/downvote/:postId', voteController.removeDownVote);

module.exports = vote;

const express = require('express');
const comment = express.Router();
const bodyValidation = require('../utils/validation');
const commentController = require('../controllers/comment.controller');

comment.get('/:postId/comments', commentController.getAllComments);
comment.post(
    '/create/:postId',
    bodyValidation('createComment'),
    commentController.createComment,
);
comment.patch(
    '/update/:postId/comment/:commentId',
    bodyValidation('updateComment'),
    commentController.updateComment,
);
comment.delete(
    '/delete/:postId/comment/:commentId',
    commentController.deleteComment,
);

module.exports = comment;

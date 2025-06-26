const express = require('express');
const post = express.Router();
const bodyValidation = require('../utils/validation');
const postController = require('../controllers/post.controller');

post.get('/:userId/posts', postController.getAllPosts);
post.post(
    '/create/:userId',
    bodyValidation('createPost'),
    postController.createPost,
);
post.patch(
    '/update/:userId/post/:postId',
    bodyValidation('updatePost'),
    postController.updatePost,
);
post.delete('/delete/:userId/post/:postId', postController.deletePost);

module.exports = post;

const express = require('express');
const post = express.Router();
const bodyValidation = require('../utils/validation');
const postController = require('../controllers/post.controller');
const checkPermission = require('../middlewares/rbac/checkPermission');

post.get('/:userId/posts', postController.getAllPosts);
post.post(
    '/create/:userId',
    bodyValidation('createPost'),
    checkPermission('photographer'),
    postController.createPost,
);
post.patch(
    '/update/:userId/post/:postId',
    bodyValidation('updatePost'),
    checkPermission('photographer'),
    postController.updatePost,
);
post.delete(
    '/delete/:userId/post/:postId',
    checkPermission('admin', 'photographer'),
    postController.deletePost,
);

module.exports = post;

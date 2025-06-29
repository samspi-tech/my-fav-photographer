const postService = require('../services/post.service');

const getAllUserPosts = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { page, pageSize } = req.query;

        const { posts, totalPages, totalPosts } =
            await postService.findAllUserPosts(userId, page, pageSize);

        res.status(200).send({
            statusCode: 200,
            posts,
            totalPages,
            totalPosts,
        });
    } catch (err) {
        next(err);
    }
};

const createPost = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = req.params;

        const postBody = {
            ...body,
            user: userId,
        };

        const newPost = await postService.createPost(userId, postBody);

        res.status(201).send({
            statusCode: 201,
            message: 'Post created successfully!',
            newPost,
        });
    } catch (err) {
        next(err);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { body: postBody } = req;
        const { userId, postId } = req.params;

        const updatedPost = await postService.updatePost(
            userId,
            postId,
            postBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Post updated successfully!',
            updatedPost,
        });
    } catch (err) {
        next(err);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { userId, postId } = req.params;
        await postService.deletePost(userId, postId);

        res.status(200).send({
            statusCode: 200,
            message: 'Post deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUserPosts,
    createPost,
    updatePost,
    deletePost,
};

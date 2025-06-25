const commentService = require('../services/comment.service');

const getAllComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await commentService.findAllComments(postId);

        res.status(200).send({
            statusCode: 200,
            comments,
        });
    } catch (err) {
        next(err);
    }
};

const createComment = async (req, res, next) => {
    try {
        const { body } = req;
        const { postId } = req.params;

        const commentBody = {
            ...body,
            post: postId,
        };

        const newComment = await commentService.createComment(
            postId,
            commentBody,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'Comment created successfully!',
            newComment,
        });
    } catch (err) {
        next(err);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { body: commentBody } = req;
        const { postId, commentId } = req.params;

        const updatedComment = await commentService.updateComment(
            postId,
            commentId,
            commentBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Comment updated successfully!',
            updatedComment,
        });
    } catch (err) {
        next(err);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        await commentService.deleteComment(postId, commentId);

        res.status(200).send({
            statusCode: 200,
            message: 'Comment deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment,
};

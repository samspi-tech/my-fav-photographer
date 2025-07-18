const commentService = require('../services/comment.service');

const getAllComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { page, pageSize } = req.query;

        const { comments, totalPages, totalComments } =
            await commentService.findAllComments(postId, page, pageSize);

        res.status(200).send({
            statusCode: 200,
            comments,
            totalPages,
            totalComments,
        });
    } catch (err) {
        next(err);
    }
};

const createComment = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId, postId } = req.params;

        const commentBody = {
            ...body,
            user: userId,
            post: postId,
        };

        const newComment = await commentService.createComment(
            userId,
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
        const { userId, postId, commentId } = req.params;
        await commentService.deleteComment(userId, postId, commentId);

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

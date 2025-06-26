const PostSchema = require('../models/post');
const CommentSchema = require('../models/comment');
const isArrayEmpty = require('../utils/isArrayEmpty');
const postService = require('../services/post.service');
const CommentNotFoundException = require('../exceptions/comment/CommentNotFoundException');

const findAllComments = async (postId) => {
    const comments = CommentSchema.find({ post: postId });
    if (isArrayEmpty(comments)) throw new CommentNotFoundException();

    return comments;
};

const createComment = async (postId, commentBody) => {
    const post = await postService.findPostById(postId);

    const newComment = new CommentSchema(commentBody);
    const savedComment = await newComment.save();

    await PostSchema.updateOne(
        { _id: post._id },
        { $push: { comments: savedComment } },
    );

    return savedComment;
};

const updateComment = async (postId, commentId, commentBody) => {
    const option = { new: true };
    const post = await postService.findPostById(postId);

    const commentToUpdate = await CommentSchema.findOneAndUpdate(
        {
            post: post._id,
            _id: commentId,
        },
        commentBody,
        option,
    );
    if (!commentToUpdate) throw new CommentNotFoundException();

    return commentToUpdate;
};

const deleteComment = async (postId, commentId) => {
    const post = await postService.findPostById(postId);

    const commentToDelete = await CommentSchema.findByIdAndDelete(commentId);
    if (!commentToDelete) throw new CommentNotFoundException();

    await PostSchema.updateOne(
        { _id: post._id },
        { $pull: { comments: commentToDelete._id } },
    );

    return commentToDelete;
};

module.exports = {
    findAllComments,
    createComment,
    updateComment,
    deleteComment,
};

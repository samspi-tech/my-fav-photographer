const PostSchema = require('../models/post');
const UserSchema = require('../models/user');
const CommentSchema = require('../models/comment');
const isArrayEmpty = require('../utils/isArrayEmpty');
const userService = require('../services/user.service');
const postService = require('../services/post.service');
const { calcTotalPages, calcSkipPages } = require('../utils/pagination');
const CommentNotFoundException = require('../exceptions/comment/CommentNotFoundException');

const findAllComments = async (postId, page = 1, pageSize = 10) => {
    const totalComments = await CommentSchema.countDocuments({ post: postId });
    const totalPages = calcTotalPages(totalComments, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const comments = await CommentSchema.find({ post: postId })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(skipPages)
        .populate('user', ['firstName', 'lastName', 'avatar']);
    if (isArrayEmpty(comments)) throw new CommentNotFoundException();

    return { comments, totalPages, totalComments };
};

const createComment = async (userId, postId, commentBody) => {
    const user = await userService.findUserById(userId);
    const post = await postService.findPostById(postId);

    const newComment = new CommentSchema(commentBody);
    const savedComment = await newComment.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { comments: savedComment } },
    );

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

const deleteComment = async (userId, postId, commentId) => {
    const user = await userService.findUserById(userId);
    const post = await postService.findPostById(postId);

    const commentToDelete = await CommentSchema.findByIdAndDelete(commentId);
    if (!commentToDelete) throw new CommentNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { comments: commentToDelete._id } },
    );

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

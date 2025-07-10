const PostSchema = require('../models/post');
const UserSchema = require('../models/user');
const isArrayEmpty = require('../utils/isArrayEmpty');
const userService = require('../services/user.service');
const { calcTotalPages, calcSkipPages } = require('../utils/pagination');
const PostNotFoundException = require('../exceptions/post/PostNotFoundException');

const findPostById = async (postId) => {
    const post = await PostSchema.findById(postId);
    if (!post) throw new PostNotFoundException();

    return post;
};

const findAllPosts = async (page = 1, pageSize = 10) => {
    const totalPosts = await PostSchema.countDocuments();
    const totalPages = calcTotalPages(totalPosts, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const posts = await PostSchema.find()
        .limit(pageSize)
        .skip(skipPages)
        .populate('user', ['firstName', 'lastName', 'avatar'])
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: ['firstName', 'lastName', 'avatar'],
            },
        })
        .populate('upVotes')
        .populate('downVotes');
    if (isArrayEmpty(posts)) throw new PostNotFoundException();

    return { posts, totalPages, totalPosts };
};

const findAllUserPosts = async (userId, page = 1, pageSize = 10) => {
    const totalPosts = await PostSchema.countDocuments();
    const totalPages = calcTotalPages(totalPosts, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const posts = await PostSchema.find({ user: userId })
        .limit(pageSize)
        .skip(skipPages)
        .populate('user', ['firstName', 'lastName', 'avatar'])
        .populate('upVotes')
        .populate('downVotes');
    if (isArrayEmpty(posts)) throw new PostNotFoundException();

    return { posts, totalPages, totalPosts };
};

const createPost = async (userId, postBody) => {
    const user = await userService.findUserById(userId);

    const newPost = new PostSchema(postBody);
    const savedPost = await newPost.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { posts: savedPost } },
    );

    return savedPost;
};

const updatePost = async (userId, postId, postBody) => {
    const option = { new: true };
    const user = await userService.findUserById(userId);

    const postToUpdate = await PostSchema.findOneAndUpdate(
        {
            user: user._id,
            _id: postId,
        },
        postBody,
        option,
    );
    if (!postToUpdate) throw new PostNotFoundException();

    return postToUpdate;
};

const deletePost = async (userId, postId) => {
    const user = await userService.findUserById(userId);

    const postToDelete = await PostSchema.findByIdAndDelete(postId);
    if (!postToDelete) throw new PostNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { posts: postToDelete._id } },
    );

    return postToDelete;
};

module.exports = {
    findPostById,
    findAllPosts,
    findAllUserPosts,
    createPost,
    updatePost,
    deletePost,
};

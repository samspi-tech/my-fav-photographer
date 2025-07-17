const UserSchema = require('../models/user');
const FollowerSchema = require('../models/follower');
const isArrayEmpty = require('../utils/isArrayEmpty');
const { calcTotalPages, calcSkipPages } = require('../utils/pagination');
const UserNotFoundException = require('../exceptions/user/UserNotFoundException');
const NotFollowingException = require('../exceptions/follower/NotFollowingException');
const AlreadyFollowingException = require('../exceptions/follower/AlreadyFollowingException');

const findAllFollowers = async (photographerId, page = 1, pageSize = 10) => {
    const totalFollowers = await FollowerSchema.countDocuments({
        photographerId,
    });
    const totalPages = calcTotalPages(totalFollowers, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const followers = await FollowerSchema.find({ photographerId })
        .limit(pageSize)
        .skip(skipPages)
        .select('-photographerId')
        .populate('followerId', ['firstName', 'lastName', 'avatar']);
    if (isArrayEmpty(followers)) throw new UserNotFoundException();

    return { followers, totalPages, totalFollowers };
};

const findAllFollowing = async (followerId, page = 1, pageSize = 10) => {
    const totalFollowing = await FollowerSchema.countDocuments({ followerId });
    const totalPages = calcTotalPages(totalFollowing, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const following = await FollowerSchema.find({ followerId })
        .limit(pageSize)
        .skip(skipPages)
        .select('-followerId')
        .populate({
            path: 'photographerId',
            select: ['firstName', 'lastName', 'avatar'],
            populate: {
                path: 'posts',
                populate: {
                    path: ['user', 'upVotes', 'downVotes'],
                    select: [
                        'firstName',
                        'lastName',
                        'avatar',
                        'upVote',
                        'downVote',
                    ],
                },
            },
        });
    if (isArrayEmpty(following)) throw new UserNotFoundException();

    return { following, totalPages, totalFollowing };
};

const checkExistingFollow = async (photographerId, followerId) => {
    return FollowerSchema.findOne({
        photographerId,
        followerId,
    });
};

const createFollow = async (photographerId, followerId) => {
    const isExistingFollow = await checkExistingFollow(
        photographerId,
        followerId,
    );
    if (isExistingFollow) throw new AlreadyFollowingException();

    const newFollow = new FollowerSchema({
        photographerId,
        followerId,
    });
    const savedFollow = await newFollow.save();

    await UserSchema.updateOne(
        { _id: photographerId },
        { $push: { followers: savedFollow } },
    );

    await UserSchema.updateOne(
        { _id: followerId },
        { $push: { followers: savedFollow } },
    );

    return savedFollow;
};

const deleteFollow = async (photographerId, followerId) => {
    const isExistingFollow = await checkExistingFollow(
        photographerId,
        followerId,
    );
    if (!isExistingFollow) throw new NotFollowingException();

    const followToDelete = await FollowerSchema.findOneAndDelete({
        photographerId,
        followerId,
    });

    await UserSchema.updateOne(
        { _id: photographerId },
        { $pull: { followers: followToDelete._id } },
    );

    await UserSchema.updateOne(
        { _id: followerId },
        { $pull: { followers: followToDelete._id } },
    );

    return followToDelete;
};

module.exports = {
    findAllFollowers,
    findAllFollowing,
    createFollow,
    deleteFollow,
};

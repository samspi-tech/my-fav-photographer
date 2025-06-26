const UserSchema = require('../models/user');
const FollowerSchema = require('../models/follower');
const NotFollowingException = require('../exceptions/follower/NotFollowingException');
const AlreadyFollowingException = require('../exceptions/follower/AlreadyFollowingException');

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
    createFollow,
    deleteFollow,
};

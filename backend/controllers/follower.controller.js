const followerService = require('../services/follower.service');

const getAllFollowers = async (req, res, next) => {
    try {
        const { page, pageSize } = req.query;
        const { photographerId } = req.params;

        const { followers, totalPages, totalFollowers } =
            await followerService.findAllFollowers(
                photographerId,
                page,
                pageSize,
            );

        res.status(200).send({
            statusCode: 200,
            followers,
            totalPages,
            totalFollowers,
        });
    } catch (err) {
        next(err);
    }
};

const getAllFollowing = async (req, res, next) => {
    try {
        const { followerId } = req.params;
        const { page, pageSize } = req.query;

        const { following, totalPages, totalFollowing } =
            await followerService.findAllFollowing(followerId, page, pageSize);

        res.status(200).send({
            statusCode: 200,
            following,
            totalPages,
            totalFollowing,
        });
    } catch (err) {
        next(err);
    }
};

const createFollow = async (req, res, next) => {
    try {
        const { body } = req;
        const { photographerId } = body;
        const { followerId } = req.params;

        const newFollow = await followerService.createFollow(
            photographerId,
            followerId,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'Photographer successfully followed!',
            newFollow,
        });
    } catch (err) {
        next(err);
    }
};

const deleteFollow = async (req, res, next) => {
    try {
        const { followerId, photographerId } = req.params;
        await followerService.deleteFollow(photographerId, followerId);

        res.status(200).send({
            statusCode: 200,
            message: 'Follow deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllFollowers,
    getAllFollowing,
    createFollow,
    deleteFollow,
};

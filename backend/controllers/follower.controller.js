const followerService = require('../services/follower.service');

const createFollow = async (req, res, next) => {
    try {
        const { followerId, photographerId } = req.params;

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
    createFollow,
    deleteFollow,
};

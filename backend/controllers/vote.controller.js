const voteService = require('../services/vote.service');

const upVote = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = body;
        const { postId } = req.params;

        await voteService.upVote(postId, userId);

        res.status(200).send({
            statusCode: 200,
            message: 'You upVoted this post',
        });
    } catch (err) {
        next(err);
    }
};

const downVote = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = body;
        const { postId } = req.params;

        await voteService.downVote(postId, userId);

        res.status(200).send({
            statusCode: 200,
            message: 'You downVoted this post',
        });
    } catch (err) {
        next(err);
    }
};

const removeUpVote = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = body;
        const { postId } = req.params;

        await voteService.removeUpVote(postId, userId);

        res.status(200).send({
            statusCode: 200,
            message: 'Vote removed successfully',
        });
    } catch (err) {
        next(err);
    }
};

const removeDownVote = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = body;
        const { postId } = req.params;

        await voteService.removeDownVote(postId, userId);

        res.status(200).send({
            statusCode: 200,
            message: 'Vote removed successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    upVote,
    downVote,
    removeUpVote,
    removeDownVote,
};

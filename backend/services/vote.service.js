const VoteSchema = require('../models/vote');
const PostSchema = require('../models/post');
const postService = require('../services/post.service');
const userService = require('../services/user.service');
const VoteNotFoundException = require('../exceptions/vote/VoteNotFoundException');
const VoteAlreadyExistsException = require('../exceptions/vote/VoteAlreadyExistsException');

const checkExistingVote = async (vote) => {
    return VoteSchema.findOne(vote);
};

const upVote = async (postId, userId) => {
    const post = await postService.findPostById(postId);
    const user = await userService.findUserById(userId);

    const isUpVote = await checkExistingVote({
        post: post._id,
        upVote: user._id,
    });
    if (isUpVote) throw new VoteAlreadyExistsException();

    const isDownVote = await checkExistingVote({
        post: post._id,
        downVote: user._id,
    });
    if (isDownVote) await removeDownVote(postId, userId);

    const newUpVote = new VoteSchema({ upVote: user._id, post: post._id });
    const savedUpVote = await newUpVote.save();

    await PostSchema.updateOne(
        { _id: post._id },
        { $push: { upVotes: savedUpVote } },
    );

    return savedUpVote;
};

const downVote = async (postId, userId) => {
    const post = await postService.findPostById(postId);
    const user = await userService.findUserById(userId);

    const isDownVote = await checkExistingVote({
        post: post._id,
        downVote: user._id,
    });
    if (isDownVote) throw new VoteAlreadyExistsException();

    const isUpVote = await checkExistingVote({
        post: post._id,
        upVote: user._id,
    });
    if (isUpVote) await removeUpVote(postId, userId);

    const newDownVote = new VoteSchema({ downVote: user._id, post: post._id });
    const savedDownVote = await newDownVote.save();

    await PostSchema.updateOne(
        { _id: post._id },
        { $push: { downVotes: savedDownVote } },
    );

    return savedDownVote;
};

const removeUpVote = async (postId, userId) => {
    const post = await postService.findPostById(postId);
    const user = await userService.findUserById(userId);

    const upVoteToDelete = await VoteSchema.findOneAndDelete({
        post: post._id,
        upVote: user._id,
    });
    if (!upVoteToDelete) throw new VoteNotFoundException();

    await PostSchema.updateOne(
        { _id: post._id },
        { $pull: { upVotes: upVoteToDelete._id } },
    );

    return upVoteToDelete;
};

const removeDownVote = async (postId, userId) => {
    const post = await postService.findPostById(postId);
    const user = await userService.findUserById(userId);

    const downVoteToDelete = await VoteSchema.findOneAndDelete({
        post: post._id,
        downVote: user._id,
    });
    if (!downVoteToDelete) throw new VoteNotFoundException();

    await PostSchema.updateOne(
        { _id: post._id },
        { $pull: { downVotes: downVoteToDelete._id } },
    );

    return downVoteToDelete;
};

module.exports = {
    upVote,
    downVote,
    removeUpVote,
    removeDownVote,
};

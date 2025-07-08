const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema(
    {
        upVote: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        downVote: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('vote', VoteSchema, 'votes');

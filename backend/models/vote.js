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
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('vote', VoteSchema, 'votes');

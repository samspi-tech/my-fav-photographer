const mongoose = require('mongoose');

const FollowerSchema = new mongoose.Schema(
    {
        photographerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('follower', FollowerSchema, 'followers');

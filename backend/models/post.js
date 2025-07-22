const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 255,
            required: true,
            unique: true,
            trim: true,
        },
        body: {
            type: String,
            maxLength: 2550,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            },
        ],
        upVotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'vote',
            },
        ],
        downVotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'vote',
            },
        ],
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('post', PostSchema, 'posts');

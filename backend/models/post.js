const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minLength: 1,
            maxLength: 255,
            required: true,
        },
        body: {
            type: String,
            minLength: 1,
            maxLength: 2550,
            required: true,
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
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.module('post', PostSchema, 'posts');

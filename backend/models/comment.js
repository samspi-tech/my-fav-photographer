const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            minLength: 1,
            maxLength: 2550,
            required: true,
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.module('comment', CommentSchema, 'comments');

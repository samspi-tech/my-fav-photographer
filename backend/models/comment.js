const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            maxLength: 2550,
            required: true,
        },
        user: {
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

module.exports = mongoose.model('comment', CommentSchema, 'comments');

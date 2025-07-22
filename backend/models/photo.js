const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            maxLength: 255,
            required: true,
        },
        body: {
            type: String,
            maxLength: 2550,
            default: '',
            trim: true,
        },
        tag: {
            type: String,
            maxLength: 255,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('photo', PhotoSchema, 'photos');

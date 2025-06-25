const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            maxLength: 255,
            match: '/^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/',
            required: true,
        },
        body: {
            type: String,
            maxLength: 2550,
            default: '',
        },
        tag: {
            type: String,
            maxLength: 255,
            default: '',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('photo', PhotoSchema, 'photos');

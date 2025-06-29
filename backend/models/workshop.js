const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 255,
            required: true,
        },
        body: {
            type: String,
            maxLength: 2550,
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'participant',
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('workshop', WorkshopSchema, 'workshops');

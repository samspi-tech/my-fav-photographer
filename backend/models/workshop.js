const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema(
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
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.module('workshop', WorkshopSchema, 'workshops');

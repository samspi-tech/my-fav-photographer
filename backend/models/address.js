const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            maxLength: 255,
            required: true,
        },
        city: {
            type: String,
            maxLength: 255,
            required: true,
        },
        province: {
            type: String,
            maxLength: 255,
            required: true,
        },
        cap: {
            type: Number,
            maxLength: 255,
            required: true,
        },
        contact: {
            type: Number,
            minLength: 10,
            maxLength: 255,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('address', AddressSchema, 'addresses');

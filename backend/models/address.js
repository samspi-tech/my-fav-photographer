const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            minLength: 1,
            maxLength: 255,
            required: true,
        },
        city: {
            type: String,
            minLength: 1,
            maxLength: 250,
            required: true,
        },
        province: {
            type: String,
            minLength: 1,
            maxLength: 250,
            required: true,
        },
        cap: {
            type: String,
            minLength: 1,
            maxLength: 250,
            required: true,
        },
        contact: {
            type: Number,
            min: 10,
            required: true,
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.module('address', AddressSchema, 'addresses');

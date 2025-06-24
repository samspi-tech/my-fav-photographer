const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            minLength: 1,
            maxLength: 255,
            required: true,
        },
        lastName: {
            type: String,
            minLength: 1,
            maxLength: 255,
            required: true,
        },
        avatar: {
            type: String,
            maxLength: 255,
            match: '/^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/',
            default:
                'https://images.unsplash.com/photo-1706606999710-72658165a73d?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        password: {
            type: String,
            minLength: 8,
            maxLength: 255,
            required: true,
        },
        email: {
            type: String,
            minLength: 1,
            maxLength: 255,
            unique: true,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'photographer', 'user'],
            required: true,
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('user', UserSchema, 'users');

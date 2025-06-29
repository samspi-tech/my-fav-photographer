const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            maxLength: 255,
            required: true,
        },
        lastName: {
            type: String,
            maxLength: 255,
            required: true,
        },
        avatar: {
            type: String,
            maxLength: 255,
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
            default: 'user',
        },
        addresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'address',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            },
        ],
        equipments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'equipment',
            },
        ],
        photos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'photo',
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post',
            },
        ],
        workshops: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'workshop',
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'follower',
            },
        ],
    },
    { timestamps: true, strict: true },
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await hashPassword(this.password);

        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const hashedPassword = await hashPassword(update.password);

        this.setUpdate({
            ...update,
            password: hashedPassword,
        });
    }

    next();
});

module.exports = mongoose.model('user', UserSchema, 'users');

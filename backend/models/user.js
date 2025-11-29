const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            maxLength: 255,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            maxLength: 255,
            default:
                'https://res.cloudinary.com/diz5tgmqg/image/upload/v1764436515/avatar.png',
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
            type: Date,
            required: true,
        },
        role: {
            type: String,
            enum: ['photographer', 'user'],
            default: 'user',
        },
        photographyStyle: {
            type: String,
            maxLength: 2550,
            trim: true,
        },
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

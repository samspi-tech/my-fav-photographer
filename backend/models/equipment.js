const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema(
    {
        camera: {
            type: String,
            maxLength: 255,
            required: true,
        },
        lens: {
            type: String,
            maxLength: 255,
            required: true,
        },
        bag: {
            type: String,
            maxLength: 255,
            required: true,
        },
        tripod: {
            type: String,
            maxLength: 255,
            required: true,
        },
        other: {
            type: String,
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

module.exports = mongoose.model('equipment', EquipmentSchema, 'equipments');

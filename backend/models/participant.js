const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema(
    {
        workshopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'workshop',
        },
        participantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model(
    'participant',
    ParticipantSchema,
    'participants',
);

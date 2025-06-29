const express = require('express');
const participant = express.Router();
const participantController = require('../controllers/participant.controller');

participant.get('/:workshopId', participantController.getAllParticipants);
participant.post(
    '/create/:workshopId',
    participantController.createParticipant,
);
participant.delete(
    '/delete/:workshopId/participant/:participantId',
    participantController.deleteParticipant,
);

module.exports = participant;

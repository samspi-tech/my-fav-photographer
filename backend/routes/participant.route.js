const express = require('express');
const participant = express.Router();
const checkPermission = require('../middlewares/rbac/checkPermission');
const participantController = require('../controllers/participant.controller');

participant.get('/:workshopId', participantController.getAllParticipants);
participant.post(
    '/create/:workshopId',
    checkPermission('user'),
    participantController.createParticipant,
);
participant.delete(
    '/delete/:workshopId/participant/:participantId',
    checkPermission('user'),
    participantController.deleteParticipant,
);

module.exports = participant;

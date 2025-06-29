const participantService = require('../services/participant.service');

const getAllParticipants = async (req, res, next) => {
    try {
        const { workshopId } = req.params;

        const participants =
            await participantService.findAllParticipants(workshopId);

        res.status(200).send({
            statusCode: 200,
            participants,
        });
    } catch (err) {
        next(err);
    }
};

const createParticipant = async (req, res, next) => {
    try {
        const { body } = req;
        const { participantId } = body;
        const { workshopId } = req.params;

        const newParticipant = await participantService.createParticipant(
            workshopId,
            participantId,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'User registered to workshop successfully',
            newParticipant,
        });
    } catch (err) {
        next(err);
    }
};

const deleteParticipant = async (req, res, next) => {
    try {
        const { workshopId, participantId } = req.params;
        await participantService.deleteParticipant(workshopId, participantId);

        res.status(200).send({
            statusCode: 200,
            message: 'User removed from workshop successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllParticipants,
    createParticipant,
    deleteParticipant,
};

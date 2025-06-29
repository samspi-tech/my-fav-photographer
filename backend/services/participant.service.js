const UserSchema = require('../models/user');
const WorkshopSchema = require('../models/workshop');
const isArrayEmpty = require('../utils/isArrayEmpty');
const ParticipantSchema = require('../models/participant');
const UserNotFoundException = require('../exceptions/user/UserNotFoundException');
const ParticipantNotRegisteredException = require('../exceptions/participant/ParticipantNotRegisteredException');
const ParticipantAlreadyRegisteredException = require('../exceptions/participant/ParticipantAlreadyRegisteredException');

const findAllParticipants = async (workshopId) => {
    const participants = await ParticipantSchema.find({ workshopId }).populate(
        'participantId',
        ['firstName', 'lastName', 'avatar'],
    );
    if (isArrayEmpty(participants)) throw new UserNotFoundException();

    return participants;
};

const checkExistingParticipant = async (workshopId, participantId) => {
    return ParticipantSchema.findOne({
        workshopId,
        participantId,
    });
};

const createParticipant = async (workshopId, participantId) => {
    const isExistingParticipant = await checkExistingParticipant(
        workshopId,
        participantId,
    );
    if (isExistingParticipant)
        throw new ParticipantAlreadyRegisteredException();

    const newParticipant = new ParticipantSchema({ workshopId, participantId });
    const savedParticipant = await newParticipant.save();

    await WorkshopSchema.updateOne(
        { _id: workshopId },
        { $push: { participants: savedParticipant } },
    );

    await UserSchema.updateOne(
        { _id: participantId },
        { $push: { workshops: workshopId } },
    );

    return savedParticipant;
};

const deleteParticipant = async (workshopId, participantId) => {
    const isExistingParticipant = await checkExistingParticipant(
        workshopId,
        participantId,
    );
    if (!isExistingParticipant) throw new ParticipantNotRegisteredException();

    const participantToDelete = await ParticipantSchema.findOneAndDelete({
        workshopId,
        participantId,
    });

    await WorkshopSchema.updateOne(
        { _id: workshopId },
        { $pull: { participants: participantToDelete._id } },
    );

    await UserSchema.updateOne(
        { _id: participantId },
        { $pull: { workshops: workshopId } },
    );

    return participantToDelete;
};

module.exports = {
    findAllParticipants,
    createParticipant,
    deleteParticipant,
};

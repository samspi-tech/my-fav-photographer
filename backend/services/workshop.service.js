const UserSchema = require('../models/user');
const WorkshopSchema = require('../models/workshop');
const isArrayEmpty = require('../utils/isArrayEmpty');
const userService = require('../services/user.service');
const WorkshopNotFoundException = require('../exceptions/workshop/WorkshopNotFoundException');

const findAllWorkshops = async (userId) => {
    const workshops = WorkshopSchema.find({ user: userId });
    if (isArrayEmpty(workshops)) throw new WorkshopNotFoundException();

    return workshops;
};

const createWorkshop = async (userId, workshopBody) => {
    const user = await userService.findUserById(userId);

    const newWorkshop = new WorkshopSchema(workshopBody);
    const savedWorkshop = await newWorkshop.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { workshops: savedWorkshop } },
    );

    return savedWorkshop;
};

const updateWorkshop = async (userId, workshopId, workshopBody) => {
    const option = { new: true };
    const user = await userService.findUserById(userId);

    const workshopToUpdate = await WorkshopSchema.findOneAndUpdate(
        {
            user: user._id,
            _id: workshopId,
        },
        workshopBody,
        option,
    );
    if (!workshopToUpdate) throw new WorkshopNotFoundException();

    return workshopToUpdate;
};

const deleteWorkshop = async (userId, workshopId) => {
    const user = await userService.findUserById(userId);

    const workshopToDelete = await WorkshopSchema.findByIdAndDelete(workshopId);
    if (!workshopToDelete) throw new WorkshopNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { workshops: workshopToDelete._id } },
    );

    return workshopToDelete;
};

module.exports = {
    findAllWorkshops,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
};

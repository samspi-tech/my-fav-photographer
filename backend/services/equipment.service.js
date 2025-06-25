const UserSchema = require('../models/user');
const EquipmentSchema = require('../models/equipment');
const userService = require('../services/user.service');
const EquipmentNotFoundException = require('../exceptions/equipment/EquipmentNotFoundException');

const findAllEquipments = async (userId) => {
    const equipments = EquipmentSchema.find({ user: userId });
    if (!equipments) throw new EquipmentNotFoundException();

    return equipments;
};

const createEquipment = async (userId, equipmentBody) => {
    const user = await userService.findUserById(userId);

    const newEquipment = new EquipmentSchema(equipmentBody);
    const savedEquipment = await newEquipment.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { equipments: savedEquipment } },
    );

    return savedEquipment;
};

const updateEquipment = async (userId, equipmentId, equipmentBody) => {
    const option = { new: true };
    const user = await userService.findUserById(userId);

    const equipmentToUpdate = await EquipmentSchema.findOneAndUpdate(
        {
            user: user._id,
            _id: equipmentId,
        },
        equipmentBody,
        option,
    );
    if (!equipmentToUpdate) throw new EquipmentNotFoundException();

    return equipmentToUpdate;
};

const deleteEquipment = async (userId, equipmentId) => {
    const user = await userService.findUserById(userId);

    const equipmentToDelete =
        await EquipmentSchema.findByIdAndDelete(equipmentId);
    if (!equipmentToDelete) throw new EquipmentNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { equipment: equipmentToDelete._id } },
    );

    return equipmentToDelete;
};

module.exports = {
    findAllEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
};

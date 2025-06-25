const equipmentService = require('../services/equipment.service');

const getAllEquipments = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const equipments = await equipmentService.findAllEquipments(userId);

        res.status(200).send({
            statusCode: 200,
            equipments,
        });
    } catch (err) {
        next(err);
    }
};

const createEquipment = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = req.params;

        const equipmentBody = {
            ...body,
            user: userId,
        };

        const newEquipment = await equipmentService.createEquipment(
            userId,
            equipmentBody,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'Equipment created successfully!',
            newEquipment,
        });
    } catch (err) {
        next(err);
    }
};

const updateEquipment = async (req, res, next) => {
    try {
        const { body: equipmentBody } = req;
        const { userId, equipmentId } = req.params;

        const updatedEquipment = await equipmentService.updateEquipment(
            userId,
            equipmentId,
            equipmentBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Equipment updated successfully!',
            updatedEquipment,
        });
    } catch (err) {
        next(err);
    }
};

const deleteEquipment = async (req, res, next) => {
    try {
        const { userId, equipmentId } = req.params;
        await equipmentService.deleteEquipment(userId, equipmentId);

        res.status(200).send({
            statusCode: 200,
            message: 'Equipment deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
};

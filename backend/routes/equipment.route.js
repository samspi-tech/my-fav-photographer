const express = require('express');
const equipment = express.Router();
const bodyValidation = require('../utils/validation');
const equipmentController = require('../controllers/equipment.controller');

equipment.get('/:userId/equipments', equipmentController.getAllEquipments);
equipment.post(
    '/create/:userId',
    bodyValidation('createEquipment'),
    equipmentController.createEquipment,
);
equipment.patch(
    '/update/:userId/equipment/:equipmentId',
    bodyValidation('updateEquipment'),
    equipmentController.updateEquipment,
);
equipment.delete(
    '/delete/:userId/equipment/:equipmentId',
    equipmentController.deleteEquipment,
);

module.exports = equipment;

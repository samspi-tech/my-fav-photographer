const express = require('express');
const equipment = express.Router();
const bodyValidation = require('../utils/validation');
const checkPermission = require('../middlewares/rbac/checkPermission');
const equipmentController = require('../controllers/equipment.controller');

equipment.get('/:userId/equipments', equipmentController.getAllEquipments);
equipment.post(
    '/create/:userId',
    bodyValidation('createEquipment'),
    checkPermission('photographer'),
    equipmentController.createEquipment,
);
equipment.patch(
    '/update/:userId/equipment/:equipmentId',
    bodyValidation('updateEquipment'),
    checkPermission('photographer'),
    equipmentController.updateEquipment,
);
equipment.delete(
    '/delete/:userId/equipment/:equipmentId',
    checkPermission('photographer'),
    equipmentController.deleteEquipment,
);

module.exports = equipment;

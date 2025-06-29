const express = require('express');
const workshop = express.Router();
const bodyValidation = require('../utils/validation');
const checkPermission = require('../middlewares/auth/checkPermission');
const workshopController = require('../controllers/workshop.controller');

workshop.get('/:userId/workshops', workshopController.getAllWorkshops);
workshop.post(
    '/create/:userId',
    bodyValidation('createPost'),
    checkPermission('photographer'),
    workshopController.createWorkshop,
);
workshop.patch(
    '/update/:userId/workshop/:workshopId',
    bodyValidation('updatePost'),
    checkPermission('photographer'),
    workshopController.updateWorkshop,
);
workshop.delete(
    '/delete/:userId/workshop/:workshopId',
    checkPermission('photographer'),
    workshopController.deleteWorkshop,
);

module.exports = workshop;

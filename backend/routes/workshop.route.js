const express = require('express');
const workshop = express.Router();
const bodyValidation = require('../utils/validation');
const workshopController = require('../controllers/workshop.controller');

workshop.get('/:userId/workshops', workshopController.getAllWorkshops);
workshop.post(
    '/create/:userId',
    bodyValidation('createPost'),
    workshopController.createWorkshop,
);
workshop.patch(
    '/update/:userId/workshop/:workshopId',
    bodyValidation('updatePost'),
    workshopController.updateWorkshop,
);
workshop.delete(
    '/delete/:userId/workshop/:workshopId',
    workshopController.deleteWorkshop,
);

module.exports = workshop;

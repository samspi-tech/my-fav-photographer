const workshopService = require('../services/workshop.service');

const getAllWorkshops = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const workshops = await workshopService.findAllWorkshops(userId);

        res.status(200).send({
            statusCode: 200,
            workshops,
        });
    } catch (err) {
        next(err);
    }
};

const createWorkshop = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = req.params;

        const workshopBody = {
            ...body,
            user: userId,
        };

        const newWorkshop = await workshopService.createWorkshop(
            userId,
            workshopBody,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'Workshop created successfully!',
            newWorkshop,
        });
    } catch (err) {
        next(err);
    }
};

const updateWorkshop = async (req, res, next) => {
    try {
        const { body: workshopBody } = req;
        const { userId, workshopId } = req.params;

        const updatedWorkshop = await workshopService.updateWorkshop(
            userId,
            workshopId,
            workshopBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Workshop updated successfully!',
            updatedWorkshop,
        });
    } catch (err) {
        next(err);
    }
};

const deleteWorkshop = async (req, res, next) => {
    try {
        const { userId, workshopId } = req.params;
        await workshopService.deleteWorkshop(userId, workshopId);

        res.status(200).send({
            statusCode: 200,
            message: 'Workshop deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllWorkshops,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
};

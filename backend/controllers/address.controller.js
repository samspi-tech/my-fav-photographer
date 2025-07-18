const addressService = require('../services/address.service');

const getAllAddresses = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const addresses = await addressService.findAllAddresses(userId);

        res.status(200).send({
            statusCode: 200,
            addresses,
        });
    } catch (err) {
        next(err);
    }
};

const createAddress = async (req, res, next) => {
    try {
        const { body } = req;
        const { userId } = req.params;

        const addressBody = {
            ...body,
            user: userId,
        };

        const newAddress = await addressService.createAddress(
            userId,
            addressBody,
        );

        res.status(201).send({
            statusCode: 201,
            message: 'Address created successfully!',
            newAddress,
        });
    } catch (err) {
        next(err);
    }
};

const updateAddress = async (req, res, next) => {
    try {
        const { body: addressBody } = req;
        const { userId, addressId } = req.params;

        const updatedAddress = await addressService.updateAddress(
            userId,
            addressId,
            addressBody,
        );

        res.status(200).send({
            statusCode: 200,
            message: 'Address updated successfully!',
            updatedAddress,
        });
    } catch (err) {
        next(err);
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const { userId, addressId } = req.params;
        await addressService.deleteAddress(userId, addressId);

        res.status(200).send({
            statusCode: 200,
            message: 'Address deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
};

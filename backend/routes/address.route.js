const express = require('express');
const address = express.Router();
const bodyValidation = require('../utils/validation');
const addressController = require('../controllers/address.controller');

address.get('/:userId/addresses', addressController.getAllAddresses);
address.post(
    '/create/:userId',
    bodyValidation('createAddress'),
    addressController.createAddress,
);
address.patch(
    '/update/:userId/address/:addressId',
    bodyValidation('updateAddress'),
    addressController.updateAddress,
);
address.delete(
    '/delete/:userId/address/:addressId',
    addressController.deleteAddress,
);

module.exports = address;

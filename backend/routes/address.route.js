const express = require('express');
const address = express.Router();
const bodyValidation = require('../utils/validation');
const checkPermission = require('../middlewares/rbac/checkPermission');
const addressController = require('../controllers/address.controller');

address.get(
    '/:userId/addresses',
    checkPermission('user'),
    addressController.getAllAddresses,
);
address.post(
    '/create/:userId',
    bodyValidation('createAddress'),
    checkPermission('user'),
    addressController.createAddress,
);
address.patch(
    '/update/:userId/address/:addressId',
    bodyValidation('updateAddress'),
    checkPermission('user'),
    addressController.updateAddress,
);
address.delete(
    '/delete/:userId/address/:addressId',
    checkPermission('user'),
    addressController.deleteAddress,
);

module.exports = address;

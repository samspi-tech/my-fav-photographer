const UserSchema = require('../models/user');
const AddressSchema = require('../models/address');
const userService = require('../services/user.service');
const AddressNotFoundException = require('../exceptions/address/AddressNotFoundException');

const findAllAddresses = async (userId) => {
    const addresses = AddressSchema.find({ user: userId });
    if (!addresses) throw new AddressNotFoundException();

    return addresses;
};

const createAddress = async (userId, addressBody) => {
    const user = await userService.findUserById(userId);

    const newAddress = new AddressSchema(addressBody);
    const savedAddress = await newAddress.save();

    await UserSchema.updateOne(
        { _id: user._id },
        { $push: { addresses: savedAddress } },
    );

    return savedAddress;
};

const updateAddress = async (userId, addressId, addressBody) => {
    const option = { new: true };
    const user = await userService.findUserById(userId);

    const addressToUpdate = await AddressSchema.findOneAndUpdate(
        {
            user: user._id,
            _id: addressId,
        },
        addressBody,
        option,
    );
    if (!addressToUpdate) throw new AddressNotFoundException();

    return addressToUpdate;
};

const deleteAddress = async (userId, addressId) => {
    const user = await userService.findUserById(userId);

    const addressToDelete = await AddressSchema.findByIdAndDelete(addressId);
    if (!addressToDelete) throw new AddressNotFoundException();

    await UserSchema.updateOne(
        { _id: user._id },
        { $pull: { addresses: addressToDelete._id } },
    );

    return addressToDelete;
};

module.exports = {
    findAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
};

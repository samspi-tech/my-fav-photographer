const UserSchema = require('../models/user');
const isArrayEmpty = require('../utils/isArrayEmpty');
const { calcTotalPages, calcSkipPages } = require('../utils/pagination');
const PhotographerNotFoundException = require('../exceptions/user/PhotographerNotFoundException');

const createUser = async (body) => {
    return await UserSchema.create(body);
};

const findAllPhotographers = async (username = '', page = 1, pageSize = 10) => {
    const filter = {
        role: 'photographer',
        username: {
            $regex: `${username}`,
            $options: 'i',
        },
    };

    const totalPhotographers = await UserSchema.countDocuments(filter);
    const totalPages = calcTotalPages(totalPhotographers, pageSize);
    const skipPages = calcSkipPages(page, pageSize);

    const photographers = await UserSchema.find(filter)
        .limit(pageSize)
        .skip(skipPages)
        .select(['username', 'avatar', 'photographyStyle', 'createdAt']);

    if (isArrayEmpty(photographers)) throw new PhotographerNotFoundException();

    return {
        photographers,
        totalPages,
        totalPhotographers,
    };
};

module.exports = {
    createUser,
    findAllPhotographers,
};

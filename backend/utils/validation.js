const {
    addressBodyValidation,
    addressBodyValidator,
} = require('../middlewares/address/validateAddressBody');

const {
    addressBodyUpdateValidation,
    addressBodyUpdateValidator,
} = require('../middlewares/address/validateAddressBodyUpdate');

const {
    commentBodyValidation,
    commentBodyValidator,
} = require('../middlewares/comment/validateCommentBody');

const {
    commentBodyUpdateValidation,
    commentBodyUpdateValidator,
} = require('../middlewares/comment/validateCommentBodyUpdate');

const {
    equipmentBodyValidation,
    equipmentBodyValidator,
} = require('../middlewares/equipment/validateEquipmentBody');

const {
    equipmentBodyUpdateValidation,
    equipmentBodyUpdateValidator,
} = require('../middlewares/equipment/validateEquipmentBodyUpdate');

const {
    photoBodyValidation,
    photoBodyValidator,
} = require('../middlewares/photo/validatePhotoBody');

const {
    photoBodyUpdateValidation,
    photoBodyUpdateValidator,
} = require('../middlewares/photo/validatePhotoBodyUpdate');

const {
    postBodyValidation,
    postBodyValidator,
} = require('../middlewares/post/validatePostBody');

const {
    postBodyUpdateValidation,
    postBodyUpdateValidator,
} = require('../middlewares/post/validatePostBodyUpdate');

const {
    userBodyValidation,
    userBodyValidator,
} = require('../middlewares/user/validateUserBody');

const {
    userBodyUpdateValidator,
    userBodyUpdateValidation,
} = require('../middlewares/user/validateUserBodyUpdate');

const {
    workshopBodyValidation,
    workshopBodyValidator,
} = require('../middlewares/workshop/validateWorkshopBody');

const {
    workshopBodyUpdateValidation,
    workshopBodyUpdateValidator,
} = require('../middlewares/workshop/validateWrokshopBodyUpdate');

const validation = (bodyValidation) => {
    switch (bodyValidation) {
        case 'createAddress': {
            return [addressBodyValidation, addressBodyValidator];
        }
        case 'updateAddress': {
            return [addressBodyUpdateValidation, addressBodyUpdateValidator];
        }
        case 'createComment': {
            return [commentBodyValidation, commentBodyValidator];
        }
        case 'updateComment': {
            return [commentBodyUpdateValidation, commentBodyUpdateValidator];
        }
        case 'createEquipment': {
            return [equipmentBodyValidation, equipmentBodyValidator];
        }
        case 'updateEquipment': {
            return [
                equipmentBodyUpdateValidation,
                equipmentBodyUpdateValidator,
            ];
        }
        case 'createPhoto': {
            return [photoBodyValidation, photoBodyValidator];
        }
        case 'updatePhoto': {
            return [photoBodyUpdateValidation, photoBodyUpdateValidator];
        }
        case 'createPost': {
            return [postBodyValidation, postBodyValidator];
        }
        case 'updatePost': {
            return [postBodyUpdateValidation, postBodyUpdateValidator];
        }
        case 'createUser': {
            return [userBodyValidation, userBodyValidator];
        }
        case 'updateUser': {
            return [userBodyUpdateValidation, userBodyUpdateValidator];
        }
        case 'createWorkshop': {
            return [workshopBodyValidation, workshopBodyValidator];
        }
        case 'updateWorkshop': {
            return [workshopBodyUpdateValidation, workshopBodyUpdateValidator];
        }
    }
};

module.exports = validation;

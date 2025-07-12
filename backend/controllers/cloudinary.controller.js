const uploadAvatar = async (req, res, next) => {
    try {
        res.status(200).send({
            statusCode: 200,
            avatar: req.file.path,
            message: 'Avatar uploaded successfully',
        });
    } catch (err) {
        next(err);
    }
};

const uploadPhotos = async (req, res, next) => {
    try {
        res.status(200).send({
            statusCode: 200,
            photos: req.files.map((file) => file.path),
            message: 'Photos uploaded successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadAvatar,
    uploadPhotos,
};

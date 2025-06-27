const uploadFileOnCloudinary = async (req, res, next) => {
    try {
        res.status(200).send({
            statusCode: 200,
            image: req.file.path,
            message: 'Image uploaded successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadFileOnCloudinary,
};

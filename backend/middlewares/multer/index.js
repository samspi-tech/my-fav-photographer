const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Capstone',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name,
        transformation: {
            width: 320,
            height: 320,
            crop: 'fill',
            gravity: 'face',
            aspect_ratio: 1,
        },
    },
});

const cloudPhotoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Capstone photos',
        format: async (req, file) => 'jpeg',
        public_id: (req, file) => file.name,
        transformation: {
            aspect_ratio: 1.0,
            height: 1350,
            crop: 'limit',
        },
    },
});

const cloudUpload = multer({ storage: cloudStorage });
const cloudUploadPhotos = multer({ storage: cloudPhotoStorage });

module.exports = { cloudUpload, cloudUploadPhotos };

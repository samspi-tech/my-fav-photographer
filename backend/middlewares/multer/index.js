const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudAvatarStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Capstone avatar',
        format: async (req, file) => 'jpeg',
        public_id: (req, file) => file.name,
        transformation: {
            aspect_ratio: 1.0,
            gravity: 'face',
            width: 320,
            height: 320,
            crop: 'fill',
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

const cloudUploadAvatar = multer({ storage: cloudAvatarStorage });
const cloudUploadPhotos = multer({ storage: cloudPhotoStorage });

module.exports = { cloudUploadAvatar, cloudUploadPhotos };

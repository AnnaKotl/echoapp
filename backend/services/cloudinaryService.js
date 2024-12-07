const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadImage = async (imagePath, folder = 'uploads') => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder,
        });
        console.log('Upload successful:', result);
        return result.secure_url;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

const deleteTempFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

module.exports = { uploadImage, deleteTempFile };
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

const uploadIcons = async () => {
  const iconsDir = path.join(__dirname, '../public/icons');
  const icons = fs.readdirSync(iconsDir);

  for (const icon of icons) {
    const iconPath = path.join(iconsDir, icon);
    try {
      const result = await cloudinary.uploader.upload(iconPath, {
        folder: 'site_icons',
      });
      console.log(`Uploaded ${icon}:`, result.secure_url);
    } catch (error) {
      console.error(`Failed to upload ${icon}:`, error);
    }
  }
};

uploadIcons();
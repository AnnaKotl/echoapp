const Queue = require('bull');
const cloudinary = require('./cloudinary');
const cache = require('./cache');const cloudinary = require('./cloudinary');
const { setCachedData } = require('./cache');
const iconsQueue = new Queue('iconsQueue');

iconsQueue.process(async (job) => {
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'product-icons/',
  });

  const icons = result.resources.map(resource => ({
    id: resource.public_id,
    name: resource.original_filename,
    url: resource.secure_url,
  }));

  await cache.setCachedData('productIcons', icons);
});

module.exports = { iconsQueue };
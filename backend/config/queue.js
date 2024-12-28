const Queue = require('bull');

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

  await setCachedData('productIcons', icons);
});

module.exports = { iconsQueue };
const cloudinary = require('../config/cloudinary');
const cache = require('../config/cache');
const rateLimiter = require('../config/rateLimiter');

const getProductsIcons = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    const cacheKey = 'products-icons';
    const cachedIcons = await cache.getCachedData(cacheKey);

    if (cachedIcons) {
      console.log('Data from cache');
      return res.status(200).json({ icons: cachedIcons });
    }

    const folderPath = 'products-icons';
    const { resources } = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by('public_id', 'desc')
      .max_results(200)
      .execute();

    const icons = resources.map((resource) => ({
      url: resource.secure_url,
      name: resource.public_id.split('/').pop().split('.')[0],
    }));

    cache.setCachedData(cacheKey, icons);

    res.status(200).json({ icons });
  } catch (error) {
    console.error('Error fetching icons:', error);
    next(error);
  }
};

module.exports = { getProductsIcons };
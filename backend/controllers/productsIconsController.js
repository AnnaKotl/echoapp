const cloudinary = require('../config/cloudinary');
const cache = require('../config/cache');
const rateLimiter = require('../config/rateLimiter');

const CACHE_KEY = 'products-icons';
const CACHE_TTL = 3600;

const getProductsIcons = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);

    const cachedIcons = cache.getCachedData(CACHE_KEY);
    if (cachedIcons) {
      console.log('✅ Products icons from cache');
      return res.status(200).json({ icons: cachedIcons });
    }

    const folderPath = 'products-icons';
    const { resources } = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by('public_id', 'desc')
      .max_results(200)
      .execute();

    const validIcons = resources
      .filter(resource => resource.secure_url)
      .map(resource => ({
        url: resource.secure_url,
        name: resource.public_id.split('/').pop().split('.')[0],
      }));

    cache.setCachedData(CACHE_KEY, validIcons, CACHE_TTL);

    console.log('📦 Products icons from Cloudinary');
    res.status(200).json({ icons: validIcons });
  } catch (error) {
    console.error('❌ Error fetching icons:', error);
    next(error);
  }
};

module.exports = { getProductsIcons };
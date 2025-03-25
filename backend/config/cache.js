const Cache = require('../models/Cache');

async function getCachedData(key) {
  try {
    const cached = await Cache.findOne({ key });

    if (cached && cached.expiration > new Date()) {
      return cached.data;
    }

    return null;
  } catch (err) {
    console.error('Error fetching cached data:', err);
    return null;
  }
}

async function setCachedData(key, data, ttl = 3600) {
  try {
    const expiration = new Date(Date.now() + ttl * 1000);

    const cached = await Cache.findOneAndUpdate(
      { key },
      { data, expiration },
      { upsert: true, new: true }
    );
    // console.log('Cache saved:', cached);
  } catch (err) {
    console.error('Error saving cached data:', err);
  }
}

module.exports = { getCachedData, setCachedData };
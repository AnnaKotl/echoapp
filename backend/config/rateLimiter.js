const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔋 MongoDB connected for rate limiter'))
  .catch(err => console.error('🔺 MongoDB connection error for rate limiter:', err));

const mongoClient = mongoose.connection.getClient();

const rateLimiter = new RateLimiterMongo({
  storeClient: mongoClient,
  points: 5,
  duration: 1,
  keyPrefix: 'rate-limit',
});

module.exports = rateLimiter;
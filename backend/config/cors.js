/**
 * CORS Configuration:
 * This API allows cross-origin requests from the following domains:
 * - https://echocode.netlify.app
 * - http://localhost:5173
 * - https://www.echocode.app
 * 
 * The API supports the following methods:
 * - GET, HEAD, PUT, PATCH, POST, DELETE
 * 
 * Allowed headers:
 * - Content-Type
 * - Authorization
 * 
 * Credentials (cookies) are allowed to be sent with cross-origin requests.
 * To enable this functionality, the `credentials: true` option must be set in CORS configuration.
 * 
 * If a request is made from an unauthorized domain, it will be rejected with a CORS error.
 */

const allowedOrigins = [
  'https://echocode.app',
  'https://www.echocode.app',
  'https://echocode.netlify.app',
  'https://annakotl.github.io/echoapp/',
  'http://localhost:5173',
];

// ALLOWED_ORIGINS=https://echocode.netlify.app,https://www.echocode.app

// ALLOWED_ORIGINS=https://echocode.netlify.app,https://www.echocode.app

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(allowedOrigin => origin.includes(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
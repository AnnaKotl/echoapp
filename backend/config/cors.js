const allowedOrigins = [
  'https://echocode.netlify.app',
  'http://localhost:5173',
  'https://www.echocode.app',
];

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
 * If a request is made from an unauthorized domain, it will be rejected with a CORS error.
 */

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
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
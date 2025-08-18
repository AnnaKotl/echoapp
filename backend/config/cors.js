/**
 * @swagger
 * /cors-info:
 *   get:
 *     summary: Get CORS configuration
 *     description: Returns the list of allowed origins, methods, and headers for this API.
 *     tags:
 *       - CORS
 *     responses:
 *       200:
 *         description: CORS configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allowedOrigins:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["https://echocode.app", "http://localhost:5173"]
 *                 methods:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["GET", "POST", "OPTIONS"]
 *                 allowedHeaders:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Content-Type", "Authorization", "x-admin-secret"]
 *                 credentials:
 *                   type: boolean
 *                   example: true
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const logFilePath = path.join(__dirname, '..', 'logs', 'cors.log');

if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      console.log('✅ CORS: no origin (likely Postman or server-to-server), allowed');
      return callback(null, true);
    }

    if (allowedOrigins.some(allowedOrigin => origin.includes(allowedOrigin))) {
      console.log(`✅ CORS: allowed origin -> ${origin}`);
      callback(null, true);
    } else {
      const msg = `🚨 CORS BLOCKED: ${origin} is not in allowedOrigins`;
      console.warn(msg);

      if (process.env.NODE_ENV === 'production') {
        logToFile(msg);
      }

      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-admin-secret',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
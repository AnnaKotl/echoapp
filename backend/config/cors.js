const fs = require('fs');
const path = require('path');
require('dotenv').config();

const logFilePath = path.join(__dirname, '..', 'logs', 'cors.log');

// Створюємо папку для логів, якщо нема
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

// Масив дозволених origin
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Запити без origin (Postman, серверні запити) завжди дозволені
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS: allowed origin -> ${origin}`);
      callback(null, true);
    } else {
      const msg = `🚨 CORS BLOCKED: ${origin} is not allowed`;
      console.warn(msg);
      logToFile(msg);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','x-admin-secret'],
  credentials: true, // обов’язково для cookies або Bearer
  optionsSuccessStatus: 204, // статус для preflight
};

module.exports = { corsOptions, allowedOrigins };

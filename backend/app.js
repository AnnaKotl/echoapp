// Core dependencies
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

// Database connection
const connectDB = require('./config/db');

// Routes
const routes = require('./routes/index');

// Helpers & config
const errorHandler = require('./helpers/errorHandler');
const setupSwagger = require('./config/swagger');
const { corsOptions, allowedOrigins } = require('./config/cors');
const ping = require('./helpers/ping');

// Load environment variables
dotenv.config();
connectDB();

// Initialize Express app
const app = express();

// Logger format
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

// Enable CORS with custom options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// HTTP request logger
app.use(logger(formatsLogger));

// Parse JSON request bodies
app.use(express.json());

// Utility endpoints (must be before routes to take precedence)
app.get('/health', (req, res) => {
  res.status(200).send('OK 🐸');
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

app.get('/cors-info', (req, res) => {
  res.json({
    allowedOrigins,
    methods: corsOptions.methods,
    allowedHeaders: corsOptions.allowedHeaders,
    credentials: corsOptions.credentials,
  });
});

// All routes
app.use('/', routes);

// Serve favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Error handling
app.use(errorHandler);

// 404 handler
app.use((_, res) => {
  res.status(404).json({ message: '🚫 API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚫 Server error:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
  });
  const { status = 500, message = '🛑 Server error' } = err;
  res.status(status).json({ message });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔋 Server running on port ${PORT}⚙️`);
  ping.keepAlive();
});

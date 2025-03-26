const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const createSubmitRequest = require('./routes/submit-form');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');
const iconRoutes = require('./routes/icons');
const servicesRouter = require('./routes/services');
const productsIconsRoutes = require('./routes/productsIcons');
const adminRoutes = require('./routes/admin');

const errorHandler = require('./helpers/errorHandler');
const setupSwagger = require('./config/swagger');
const cors = require('cors');
const corsOptions = require('./config/cors');
const logger = require('morgan');

const ping = require('./helpers/ping');

const path = require('path');

dotenv.config();
connectDB();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(cors(corsOptions));
}

app.use(logger(formatsLogger));
app.use(express.json());
app.use(errorHandler);
app.use('/admin', adminRoutes);

app.use('/submit-request', createSubmitRequest);
app.use('/contact', contactRoutes);
app.use('/upload', uploadRoutes);
app.use('/icons', iconRoutes);
app.use('/services', servicesRouter);
app.use('/products-icons', productsIconsRoutes);

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
  res.status(200).send('Backend is live 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

setupSwagger(app);

app.use((_, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
  });
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  ping.keepAlive();
});
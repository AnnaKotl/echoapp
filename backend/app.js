const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const createSubmitRequest = require('./routes/submit-form');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');
const iconRoutes = require('./routes/icons');
const servicesRouter = require('./routes/services');
const errorHandler = require('./helpers/errorHandler');
const setupSwagger = require('./config/swagger');
const cors = require('cors');
const corsOptions = require('./config/cors');
const logger = require('morgan');

dotenv.config();

const app = express();
connectDB();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

console.log(`Environment: ${process.env.NODE_ENV}`);

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);

app.use('/submit-request', createSubmitRequest);
app.use('/contact', contactRoutes);
app.use('/upload', uploadRoutes);
app.use('/icons', iconRoutes);
app.use('/services', servicesRouter);

// Swagger
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
});
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://echocode.netlify.app',
      'http://localhost:5173',
      'https://www.echocode.app',
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;


// origin -> 'https://www.echocode.app' - in future
// local -> 'http://localhost:5173'
// netlify -> 'https://echocode.netlify.app/'
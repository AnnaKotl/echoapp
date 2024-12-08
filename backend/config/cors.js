const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local frontend
      'https://annakotl.github.io', // GitHub
      'https://echocode.netlify.app', // netlify
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Block request
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

// origin -> 'https://www.echocode.app' - in future
// local -> 'http://localhost:5173'
// netlify -> 'https://echocode.netlify.app/'
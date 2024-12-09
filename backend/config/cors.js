const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local frontend
      'https://annakotl.github.io', // GitHub Pages
      'https://echocode.netlify.app', // Netlify
      'https://www.echocode.app', // Future production domain
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
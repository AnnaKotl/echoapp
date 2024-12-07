const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local frontend
      'https://echoapp-front.onrender.com', // Deployed frontend on Render
      'https://www.echocode.app', // Production domain
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Block request
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;



// origin -> 'https://www.echocode.app'
// local -> 'http://localhost:5173'
// Render -> 'https://echoapp-backend.onrender.com'

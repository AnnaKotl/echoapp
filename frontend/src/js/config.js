const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://echoapp-backend.onrender.com' // URL для продакшн
        : 'http://localhost:5001';               // URL для локального середовища

export default API_URL;

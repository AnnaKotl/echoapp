const API_URL = process.env.NODE_ENV === 'production' 
? 'https://echoapp.onrender.com'
: 'http://localhost:5001';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export { ADMIN_PASSWORD };
export default API_URL;

// console.log("API URL:", API_URL);
// console.log(import.meta.env);
// console.log(import.meta.env.MODE);
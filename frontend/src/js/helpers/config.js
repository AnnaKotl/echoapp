const API_URL = process.env.NODE_ENV === 'production' 
? 'https://echoapp.onrender.com'
: 'http://localhost:5001';

// console.log("API URL:", API_URL);
// console.log(import.meta.env);
// console.log(import.meta.env.MODE);

export default API_URL;
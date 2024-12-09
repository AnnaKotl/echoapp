// const API_URL = import.meta.env.VITE_API_URL;

// console.log("API URL:", API_URL);
// console.log(import.meta.env);
// console.log(import.meta.env.MODE);

// export default API_URL;

const API_URL = process.env.NODE_ENV === 'production' 
? 'https://echoapp.onrender.com'  // URL для продакшн
: 'http://localhost:5001';        // URL для локального

console.log("API URL:", API_URL);
console.log(import.meta.env);
console.log(import.meta.env.MODE);

export default API_URL;
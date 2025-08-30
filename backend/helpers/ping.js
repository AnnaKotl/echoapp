const axios = require('axios');

const keepAlive = () => {
  setInterval(async () => {
    try {
      const response = await axios.get('https://echoapp.onrender.com/health');
      console.log('✅ Keep alive ping successful:', response.status);
    } catch (error) {
      console.error('❌ Keep alive ping failed:', error.message);
    }
  }, 20 * 60 * 1000); // 20 min
};

module.exports = { keepAlive };
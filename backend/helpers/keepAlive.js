const axios = require('axios');

const keepAlive = () => {
  setInterval(async () => {
    try {
      await axios.get('https://backend.echoapp.com/health');
      console.log('Server pinged to keep alive');
    } catch (error) {
      console.error('Error pinging server:', error.message);
    }
  }, 300000); // 5 min
};

module.exports = keepAlive;

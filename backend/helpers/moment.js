const moment = require('moment');

const moments = (dateString, format = 'YYYY-MM-DD HH:mm:ss') => {
  const isValid = moment(dateString, format, true).isValid();
  if (!isValid) {
    throw new Error(`Invalid date format. Expected format: ${format}`);
  }
  return moment(dateString, format).format(format);
};

module.exports = moments;

// moment - Date format
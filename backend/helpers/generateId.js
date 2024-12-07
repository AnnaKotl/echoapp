const { v4: uuidv4 } = require('uuid');

const generateId = () => uuidv4();

module.exports = generateId;

// uuid - unique ID
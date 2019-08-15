require('dotenv').config();

module.exports = {
  hostname: process.env.SERVER_HOSTNAME || '0.0.0.0',
  port: process.env.SERVER_PORT || '8383',
  mongo: process.env.MONGO_URL || `mongodb://localhost:27017/darts`,
};
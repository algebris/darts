const Mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./index');

Mongoose.Promise = Promise;
Mongoose.connect(config.mongo, { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', () => console.error(`MongoDB connection error ${config.mongo}`));
db.once('open', () => console.info(`MongoDB connected ${config.mongo}`));

// if(process.env.NODE_ENV == 'development') {
  Mongoose.set('debug', true);
// }

Mongoose.set('useCreateIndex', true);
Mongoose.set('useFindAndModify', false);

exports.db = db;
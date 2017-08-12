/**
 * 使用mongoose链接数据库
 */

const mongoose = require('mongoose');
const config = require('../config');

const dbConfig = config[process.env.NODE_ENV || 'development'];

mongoose.connect(dbConfig.mongo.host);

// 链接成功
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${dbConfig.mongo.host}`);
});

// 链接失败
mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error${error}`);
});

// 断开链接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

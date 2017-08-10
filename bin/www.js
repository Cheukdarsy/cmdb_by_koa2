/**
 * 项目入口
 */
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('../config');
const logConfig = require('../config/log_config');

const basicLogPath = logConfig.baseLogPath;
const logAppenders = logConfig.appenders;
const port = config[process.env.NODE_ENV || 'development'].port;
const dbConfig = config[process.env.NODE_ENV || 'development'];

// 判断是否存在日志目录
const confirmPath = (pathStr) => {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr);
    console.log(`create path:${pathStr}`);
  } else {
    console.log(pathStr);
  }
};

// 初始化日志目录
const initLogPath = () => {
  if (basicLogPath) {
    confirmPath(basicLogPath);
    logAppenders.map((appender) => {
      if (appender.path) {
        confirmPath(appender.path);
      }
      return '';
    });
  } else {
    console.log('basicLogPath Not Found!');
  }
};

initLogPath();

const app = require('../app');

// 链接数据库 并开始监听app
(async () => {
  try {
    await mongoose.connect(dbConfig.mongo.uri);
    await app.listen(port);
    console.log(`server started on port ${port}`);
  } catch (err) {
    console.log(err);
  }
})();

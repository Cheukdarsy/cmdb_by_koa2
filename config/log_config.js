/**
 * log4js的配置文件
 * 通过log4js进行应用日志搜集
 * 具体用法参考log4js官方网站
 */

const path = require('path');

const baseLogPath = path.resolve(__dirname, '../logs');

// 错误日志完整输出路径
const errorLogPath = `${baseLogPath}/error`;

// 响应日志输出路径
const responseLogPath = `${baseLogPath}/response`;

module.exports = {
  appenders: [
    {
      category: 'errorLogger',
      type: 'dateFile',
      filename: `${errorLogPath}/error.log`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      path: '/error'
    },
    {
      category: 'resLogger',
      type: 'dateFile',
      filename: `${responseLogPath}/response.log`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      path: '/response'
    }
  ],
  levels: {
    errorLogger: 'ERROR',
    resLogger: 'ALL'
  },
  baseLogPath
};

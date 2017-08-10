/**
 * 日志处理公共模块
 * 通过log4js对响应日志及错误日志进行集中封装
 */

const log4js = require('log4js');
const logConfig = require('../config/log_config');

// 加载配置文件
log4js.configure(logConfig);

const logUtil = {};

const errLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

/**
 * 格式化请求日志
 * @param {ctx <Object>} req
 * @param {responseTime <Date>} resTime
 */
const formatReqLog = (ctx, resTime) => {
  let logText = '';
  const method = ctx.method;
  // 访问方法
  logText += `request method:${method}\n`;
  // 请求原始地址
  logText += `request originalUrl:${ctx.url}\n`;
  // 客户端IP
  logText += `request client IP:${ctx.request}\n`;
  if (method === 'GET') {
    logText += `request query:${JSON.stringify(ctx.query)}\n`;
  } else {
    logText += `request body:\n${JSON.stringify(ctx.body)}\n`;
  }
  logText += `response time:${resTime}\n`;
  return logText;
};

/**
 * 格式化响应日志
 * @param {ctx <Object>} ctx
 * @param {responseTime <Date>} resTime
 */
const formatRes = (ctx, resTime) => {
  let logText = '';
  // 响应日志开始
  logText += '*********** response log start ************';
  // 添加响应日志
  logText += formatReqLog(ctx.req, resTime);
  // 响应状态码
  logText += `response status:${ctx.status}\n`;
  // 响应内容
  logText += `response body:\n${JSON.stringify(ctx.body)}\n`;
  // 响应日志结束
  logText += '********** reponse log end ***************';
  return logText;
};

/**
 * 格式化错误日志
 * @param {ctx <Object>} ctx
 * @param {Error <Object>} err
 * @param {responseTime <Date>} resTime
 */
const formatError = (ctx, err, resTime) => {
  let logText = '';
  // 错误信息开始
  logText += '************ error log start ************';
  logText += formatReqLog(ctx.req, resTime);
  // 错误名称
  logText += `err name:${err.name}\n`;
  // 错误信息
  logText += `err message:${err.message}\n`;
  // 错误详情
  logText += `err stack: ${err.stack}\n`;
  // 错误信息结束
  logText += '************ error log end *************';
  return logText;
};

// 封装错误日志
logUtil.logError = (ctx, error, resTime) => {
  if (ctx && error) {
    errLogger.error(formatError(ctx, error, resTime));
  }
};

// 封装响应日志
logUtil.logResponse = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

module.exports = logUtil;

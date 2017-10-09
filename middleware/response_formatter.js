/**
 * 统一处理model层返回数据，转成rest api格式
 * 在app.use(router)之前使用
 */
const ApiError = require('../utils/ApiError');

const responseFormatter = (ctx) => {
  if (ctx.body) {
    if (ctx.body.errors || String(ctx.body.name).indexOf('Error') !== -1) {
      ctx.body = {
        code: -1,
        msg: ctx.body.name || 'error',
        reason: ctx.body.message
      };
    } else {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: ctx.body
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'failed'
    };
  }
};

const urlFilter = pattern => async function (ctx, next) {
  const reg = new RegExp(pattern);
  try {
    await next();
  } catch (error) {
    if (error instanceof ApiError && reg.test(ctx.originUrl)) {
      ctx.status = 200;
      ctx.body = {
        code: error.code,
        msg: error.msg,
        data: error
      };
    }

    throw error;
  }
  console.log(ctx.header);
  if (reg.test(ctx.originalUrl)) {
    responseFormatter(ctx);
  } else {
    ctx.body = {
      code: 1,
      msg: 'auth not allowed'
    };
  }
};

module.exports = urlFilter;

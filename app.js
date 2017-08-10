//   /\_/\
// =( °w° )=
//   )   (  //
//  (__ __)//
const Koa = require('koa');
const middleware = require('./middleware');
const logUtil = require('./utils/log_util');
const router = require('./router/');

const app = new Koa();
app.use(middleware());
app.use(async (ctx, next) => {
  // 记录响应开始时间
  const startTime = new Date();
  // 响应间隔时间
  let ms;
  try {
    await next();
    ms = new Date() - startTime;
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - startTime;
    logUtil.logError(ctx, error, ms);
  }
});

// app.use(api());
app.use(router.routes(), router.allowedMethods());

module.exports = app;

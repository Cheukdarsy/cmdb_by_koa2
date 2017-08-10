/**
 * api错误名称
 */

const ApiErrorNames = {};
ApiErrorNames.UNKNOW_ERROR = 'unknow_error';
ApiErrorNames.BAD_REQUEST = 'bad_request';

const errorMap = new Map();
Object.keys(ApiErrorNames).forEach((key) => {
  errorMap.set(ApiErrorNames[key], { code: -1, msg: ApiErrorNames[key] });
});
const getErrorInfo = (errorName) => {
  let errorInfo;
  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  if (!errorInfo) {
    errorInfo = errorMap.get('unknow_error');
  }
  return errorInfo;
};

module.exports = getErrorInfo;

/**
 * 自定义API错误类
 */

const getApiErrors = require('./ApiErrorName');

class ApiError extends Error {
  constructor(errorName, errorMsg) {
    super();
    const errorInfo = getApiErrors(errorName);
    this.name = errorName;
    this.code = errorInfo.code;
    this.msg = errorMsg;
  }
}

module.exports = ApiError;

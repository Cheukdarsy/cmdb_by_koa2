/**
 * 应用基础配置
 */

module.exports = {
  development: {
    port: 3001,
    mongo: {
      user: '',
      pass: '',
      uri: 'mongodb://localhost:27017',
      database: 'local'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  },
  production: {
    port: 3002,
    mongo: {
      user: '',
      pass: '',
      host: '',
      port: '',
      database: ''
    },
    redis: {
      host: '',
      port: ''
    }
  }
};

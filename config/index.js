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
      host: '172.17.0.4',
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

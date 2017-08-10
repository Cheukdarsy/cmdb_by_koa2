/**
 * 集成部分固定中间件，通过compose返回
 */
const compose = require('koa-compose');
const convert = require('koa-convert');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const formatUrl = require('./response_formatter');

const options = {
  origin: '*'
};

module.exports = () => compose([bodyParser(), convert(cors(options)), formatUrl('^/cmdb')]);


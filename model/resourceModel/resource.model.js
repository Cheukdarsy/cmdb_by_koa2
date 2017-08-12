/**
 * 资源实例schema,用于初始化
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ResourceModel = new Schema({
  name: { type: String, default: '名称', required: true, unique: true },
  loginTime: { type: Date, default: Date.now }
}, { timestamps: {} });

module.exports = ResourceModel;

/**
 * 资源管理仪表盘模型
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CardsModel = new Schema({
  ResourceID: { type: String, ref: 'ResourceObject' },
  name: { type: String },
  Category: { type: String }
});

module.exports = mongoose.model('CardsModel', CardsModel);

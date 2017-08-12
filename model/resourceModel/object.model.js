/**
 * 资源模型创建初始化
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ResourceObject = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  ResourceID: { type: String, required: true },
  ResourceName: { type: String, required: true },
  Category: { type: String, enum: ['业务资源模型', '基础资源模型', '组织信息模型'] },
  Memo: String,
  Detail: [{ type: Schema.Types.ObjectId, ref: 'ObjectAttr' }]
});

module.exports = mongoose.model('ResourceObject', ResourceObject);

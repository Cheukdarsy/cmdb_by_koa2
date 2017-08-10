/**
 * 资源模型属性集合
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectAttr = new Schema({
  ResourceID: { type: String, ref: 'ResourceObject' },
  id: { type: Schema.Types.ObjectId, index: true },
  AttrId: { type: String, required: true },
  AttrName: { type: String, required: true },
  AttrType: { type: String, enum: ['String', 'Number', 'Date', 'TimeStamp', 'Enum', 'Array', 'SingleForeignKey', 'MultipleForeignKey'] },
  AttrExample: Schema.Types.Mixed,
  AttrClassify: String,
  AttrRequired: Boolean,
  AttrReadOnly: Boolean,
  AttrUnique: Boolean
});


module.exports = mongoose.model('ObjectAttr', ObjectAttr);

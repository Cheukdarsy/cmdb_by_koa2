/**
 * 属性的逻辑操作 ／增删改 接口
 */

const mongoose = require('mongoose');

const ObjectAttributeModel = mongoose.model('ObjectAttr');
const ResourceObjectModel = mongoose.model('ResourceObject');

class Attribute {
  static async createObjectAttr(ctx) {
    const attrObject = {};
    const { ResourceID, AttrId } = ctx.request.body;
    Object.assign(attrObject, ctx.request.body);
    try {
      const isexits = await ObjectAttributeModel.findOne({ ResourceID, AttrId });
      if (isexits) {
        ctx.body = '属性已存在!';
      } else {
        console.log(attrObject);
        const docs = await ObjectAttributeModel.create(attrObject, (err) => {
          if (err) throw new Error(err);
        });
        // 属性表与资源模型表关联，需要更新属性部分
        console.log(docs);
        const result = await ResourceObjectModel
          .update({ ResourceID }, { $push: { Detail: docs } })
          .populate('Detail')
          .exec();
        if (result) ctx.body = '属性创建成功！';
      }
    } catch (error) {
      ctx.body = error;
    }
  }

  static async displayDetailAttr(ctx) {
    const { ResourceID, AttrId } = ctx.query;
    const detailAttrs = await ObjectAttributeModel
      .findOne({ ResourceID, AttrId })
      .select('-_id -__v')
      .exec();
    ctx.body = detailAttrs;
  }

  static async displayObjectAttr(ctx) {
    const { ResourceID } = ctx.params;
    try {
      const attrs = await ObjectAttributeModel.find({ ResourceID }).select('-_id -__v').exec();
      ctx.body = attrs;
    } catch (error) {
      ctx.body = error;
    }
  }

  static async deleteObjectAttr(ctx) {
    const { AttrId, ResourceID } = ctx.request.body;
    try {
      const removeAttrResult = await ObjectAttributeModel
        .findOneAndRemove({ AttrId, ResourceID }).exec();
      if (removeAttrResult) ctx.body = `删除${AttrId}成功!`;
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = Attribute;

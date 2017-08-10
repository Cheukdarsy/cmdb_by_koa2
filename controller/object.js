/**
 * 资源模型逻辑
 */

const mongoose = require('mongoose');

const ResourceObjectModel = mongoose.model('ResourceObject');
const ObjectAttributeModel = mongoose.model('ObjectAttr');
const CardsModel = mongoose.model('CardsModel');

const DEFAULTATTRIBUTE = {
  AttrId: 'name',
  AttrName: '名称',
  AttrType: 'String',
  AttrRequired: true,
  AttrReadOnly: false,
  AttrUnique: true
};

class ObjectModel {
  // 创建新的资源模型
  static async createObject(ctx) {
    const { ResourceID } = ctx.request.body;
    console.log(ctx.request.body);
    try {
      const isexit = await ResourceObjectModel.findOne({ ResourceID });
      if (isexit) {
        ctx.body = '资源已存在';
        return;
      }
      // 在资源模型表增加一条记录
      const doc = await ResourceObjectModel
        .create(ctx.request.body);
      const defaultAttr = await ObjectAttributeModel.create(Object.assign(DEFAULTATTRIBUTE, { ResourceID }));
      // 通过关联资源模型表，页面展示的卡表增加一条记录
      const result = await CardsModel
        .create({ ResourceID: doc.ResourceID, name: doc.ResourceName, Category: doc.Category });
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  // 获取具体某个资源模型
  static async getObjectDetail(ctx) {
    const { ResourceID } = ctx.params;
    const objectDetail = await ResourceObjectModel
      .findOne({ ResourceID })
      .select('-_id -__v')
      .lean()
      .exec();
    ctx.body = objectDetail;
  }

  // 修改资源模型，ID不可改
  static async modifyResourceModel(ctx) {
    const { ResourceID } = ctx.request.body;
    Reflect.deleteProperty(ctx.request.body, 'ResourceID');
    const updatedResource = await ResourceObjectModel
      .update({ ResourceID }, ctx.request.body)
      .exec();
    ctx.body = updatedResource;
  }

  // 删除资源模型
  static async deleteObject(ctx) {
    const { ResourceID } = ctx.request.body;
    try {
      const resourceModelName = `${ResourceID}Resource`;
      const resourceModelExit = mongoose.modelNames().includes(resourceModelName);
      console.log(mongoose.modelNames());
      if (resourceModelExit) {
        await mongoose.connection.collection(`${ResourceID}resources`).drop((err) => {
          if (err) console.log(err);
          mongoose.modelNames().splice(mongoose.modelNames().indexOf(resourceModelName), 1);
        });
      }
      const removeResourceResult = await ResourceObjectModel
        .findOneAndRemove({ ResourceID })
        .exec();
      if (removeResourceResult) {
        const [removeCardResult, removeAttrReult] = await Promise
          .all([CardsModel.findOneAndRemove({ ResourceID }).exec(),
            ObjectAttributeModel.remove({ ResourceID }).exec()
          ]);
        if (removeCardResult && removeAttrReult) ctx.body = `remove ${ResourceID} successfully`;
      } else {
        ctx.body = `remove ${ResourceID} error!`;
      }
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = ObjectModel;

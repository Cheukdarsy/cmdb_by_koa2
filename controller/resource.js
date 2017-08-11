/**
 * 实例化资源的相关逻辑接口
 */

const mongoose = require('mongoose');
const ModelDatabase = require('../model');

const ObjectAttributeModel = mongoose.model('ObjectAttr');
const ResourceSchema = ModelDatabase.ResourceSchema;

class Resource {
  /**
   *
   * 转换资源模型中的属性为schema对应的对象
   * @static
   * @param {any} attrObject
   * @returns
   * @memberof Resource
   */
  static convertAttr(attrObject) {
    const modelAttr = {};
    const attrName = attrObject.AttrId;
    modelAttr[attrName] = {
      type: attrObject.AttrType,
      required: attrObject.AttrRequired || false,
      unique: attrObject.AttrUnique || false
    };
    if (attrObject.AttrType === 'Enum') {
      modelAttr[attrName].enum = attrObject.AttrExample || [];
    }
    return modelAttr;
  }
  /**
   *
   * 创建资源需在查询资源之后
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async createResource(ctx) {
    const { ResourceID } = ctx.params;
    console.log(mongoose.modelNames());
    const resourceModelName = `${ResourceID}Resource`;
    const resourceModelExit = mongoose.modelNames().includes(resourceModelName);
    const collectionNames = [];
    const collectionSet = await mongoose.connection.db.listCollections().toArray();
    collectionSet.forEach((collection) => {
      collectionNames.push(collection.name);
    });
    console.log(collectionNames);
    if (!resourceModelExit || !collectionNames.includes(`${ResourceID}resources`)) {
      ctx.body = '资源模型不存在！';
      return;
    }
    const resourceModel = mongoose.model(resourceModelName);
    const resourceInstance = {};
    Object.assign(resourceInstance, ctx.request.body);
    try {
      const docs = await resourceModel.create(resourceInstance);
      ctx.body = docs;
    } catch (error) {
      ctx.body = error;
    }
  }
  /**
   * 初始化资源或者查询资源
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async getResource(ctx) {
    const { ResourceID } = ctx.params;
    const resourceModelName = `${ResourceID}Resource`;
    // const resourceModelExit = mongoose.modelNames().includes(resourceModelName);
    try {
      // 若数据库资源不存在，初始化对应model
      const attrList = await ObjectAttributeModel
        .find({ ResourceID })
        .select('-_id -__v')
        .exec();
      attrList.forEach((attr) => {
        const cvAttr = Resource.convertAttr(attr);
        ResourceSchema.add(cvAttr);
      });
      mongoose.model(resourceModelName, ResourceSchema);
      const resourceModel = mongoose.model(resourceModelName);
      const result = await resourceModel.find({}).select('-_id -__v').exec();
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = Resource;

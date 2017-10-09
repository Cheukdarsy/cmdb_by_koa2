/**
 * 实例化资源的相关逻辑接口
 */

const mongoose = require('mongoose');
const ModelDatabase = require('../model');

const ObjectAttributeModel = mongoose.model('ObjectAttr');
const ResourceObjectModel = mongoose.model('ResourceObject');
const ResourceSchema = ModelDatabase.ResourceSchema.clone();
const CONSTANT_TYPE = {
  String: 'String',
  Number: 'Number',
  Date: 'Date',
  TimeStamp: 'Date',
  Enum: 'String',
  Array: 'Array',
  SingleForeignKey: 'Mixed',
  MultipleForeignKey: 'Mixed'
};

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
      type: CONSTANT_TYPE[attrObject.AttrType],
      required: attrObject.AttrRequired || false,
      unique: attrObject.AttrUnique || false
    };
    // if (attrObject.AttrType === 'SingleForeignKey') {
    //   const content = JSON.parse(attrObject.AttrExample);
    //   const resourceModel = mongoose.model(`${content.ResourceID}Resource`);
    //   const enumOption = resourceModel.find({}).select(content.AttrId).exec();
    //   modelAttr[attrName].enum = enumOption || [];
    // } else if (attrObject.AttrType === 'Enum') {
    //   modelAttr[attrName].enum = attrObject.AttrExample || [];
    // }
    return modelAttr;
  }
  static async getResourceModel(ResourceID, resourceModelName) {
    const collectionNames = [];
    let resourceModel = {};
    // const resourceModelExist = mongoose.modelNames().includes(resourceModelName);
    try {
      const collectionSet = await mongoose.connection.db.listCollections().toArray();
      collectionSet.forEach((collection) => {
        collectionNames.push(collection.name);
      });
      const resourceExist = collectionNames.includes(`${ResourceID}resources`) && mongoose.modelNames().includes(resourceModelName);
      if (!resourceExist) {
        resourceModel = await Resource.initialResource(ResourceID);
      } else {
        resourceModel = mongoose.model(resourceModelName);
      }
      return resourceModel;
    } catch (error) {
      throw new Error(error);
    }
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
    const resourceModelName = `${ResourceID}Resource`;
    try {
      const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
      const resourceInstance = { ResourceID };
      Object.assign(resourceInstance, ctx.request.body);
      const docs = await resourceModel.create(resourceInstance);
      ctx.body = docs;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 更新资源实例
   *
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async updateResource(ctx) {
    const { ResourceID } = ctx.params;
    const resourceModelName = `${ResourceID}Resource`;
    try {
      const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
      const resourceInstance = {};
      Object.assign(resourceInstance, ctx.request.body);
      const docs = await resourceModel.update({ ResourceID }, resourceInstance);
      ctx.body = docs;
    } catch (error) {
      ctx.body = error;
    }
  }
  /**
   * 删除资源实例
   *
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async deleteResource(ctx) {
    const { ResourceID, name } = ctx.params;
    const resourceModelName = `${ResourceID}Resource`;
    try {
      const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
      const removeResourceResult = await resourceModel
        .findOneAndRemove({ ResourceID, name }).exec();
      if (removeResourceResult) ctx.body = `删除${name}成功!`;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 获取显示条件
   *
   * @static
   * @param {any} ResourceID
   * @returns condition
   * @memberof Resource
   */
  static async getCondition(ResourceID) {
    let condition = '';
    try {
      const objectModel = await ResourceObjectModel.findOne({ ResourceID }).select('resourceDisplayList').exec();
      const dislplayList = objectModel.resourceDisplayList;
      if (dislplayList.length !== 0) {
        dislplayList.forEach((object) => {
          condition += ` ${object.AttrId}`;
        });
      } else {
        condition = '-_id -__v';
      }
      return condition;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 模糊实例搜索
   *
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async fuzzySearch(ctx) {
    const { ResourceID, q } = ctx.params;
    const resourceModelName = `${ResourceID}Resource`;
    try {
      const condition = await Resource.getCondition(ResourceID);
      const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
      const result = await resourceModel.find({}).select(condition).exec();
      const filterResult = result.filter((specificObject) => {
        let state = false;
        Object.keys(specificObject).forEach((key) => {
          if (specificObject(key).includes(q)) state = true;
        });
        return state;
      });
      ctx.body = filterResult;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 精准实例搜索
   *
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async advancedSearch(ctx) {
    const { ResourceID } = ctx.request.body;
    const resourceModelName = `${ResourceID}Resource`;
    try {
      const condition = await Resource.getCondition(ResourceID);
      const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
      const result = resourceModel.find(ctx.request.body).select(condition).exec();
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  // static async topologyInit(ctx) {
  //   const { ResourceID, name } = ctx.request.body;
  //   const resourceModelName = `${ResourceID}Resource`;
  //   const topologyObject = {};
  //   const topologyObjectChildren = [];
  //   try {
  //     const resourceModel = await Resource.getResourceModel(ResourceID, resourceModelName);
  //     const result = resourceModel.find(ctx.request.body)
  //       .select('-__v -_id loginTime updatedAt createAt').exec();
  //     topologyObject.property = name;
  //     Object.keys(result).forEach((key) => {
  //       const tempObject = {};
  //       tempObject.property = String(key) + String(result[key]);
  //     });
  //   } catch (error) {
  //     ctx.body = error;
  //   }
  // }
  /**
   * 获取资源模型的Schema
   *
   * @static
   * @param {any} ResourceID
   * @returns
   * @memberof Resource
   */
  static async getResourceSchema(ResourceID) {
    const Schema = ResourceSchema.clone();
    const attrList = await ObjectAttributeModel
      .find({ ResourceID })
      .select('-_id -__v')
      .exec();
    attrList.forEach((attr) => {
      const cvAttr = Resource.convertAttr(attr);
      Schema.add(cvAttr);
    });
    console.log(ResourceSchema.tree);
    return Schema;
  }
  /**
   * 动态初始化资源model
   *
   * @static
   * @param {any} resourceID
   * @returns {Object:Model}
   * @memberof Resource
   */
  static async initialResource(resourceID) {
    const resourceName = `${resourceID}Resource`;
    const resourceSchema = await Resource.getResourceSchema(resourceID);
    Reflect.deleteProperty(mongoose.connection.models, resourceName);
    const resourceModel = mongoose.model(resourceName, resourceSchema);
    return resourceModel;
  }
  /**
   * 初始化资源或者查询资源
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async getResource(ctx) {
    const { ResourceID } = ctx.params;
    // const resourceModelName = `${ResourceID}Resource`;
    let condition = '';
    // const resourceModelExit = mongoose.modelNames().includes(resourceModelName);
    try {
      // 若数据库资源不存在，初始化对应model··
      // const ResourceSchemas = await Resource.getResourceSchema(ResourceID);
      // Reflect.deleteProperty(mongoose.connection.models, resourceModelName);
      // // delete mongoose.connection.models[resourceModelName];
      // const resourceModel = mongoose.model(resourceModelName, ResourceSchemas);
      const resourceModel = await Resource.initialResource(ResourceID);
      const objectModel = await ResourceObjectModel.findOne({ ResourceID }).select('resourceDisplayList').exec();
      const dislplayList = objectModel.resourceDisplayList;
      if (dislplayList.length !== 0) {
        dislplayList.forEach((object) => {
          condition += ` ${object.AttrId}`;
        });
      } else {
        condition = '-_id -__v';
      }
      const result = await resourceModel.find({}).select(condition).exec();
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 获取外键资源
   *
   * @static
   * @param {any} example
   * @returns { result: [Object] }
   * @memberof Resource
   */
  static async getForeignKeyResource(Attr) {
    // const example = JSON.parse(exampleJson);
    const temAttr = Attr;
    const attrArray = [];
    const { inline, ResourceID, attribute } = JSON.parse(temAttr.AttrExample);
    const resourceModel = await Resource.initialResource(ResourceID);
    let condition = 'name';
    attribute.forEach((attr) => {
      if (attr.AttrShow) {
        condition += ` ${attr.AttrId}`;
      }
      if (attr.AttrChecked) {
        attrArray.push(attr.AttrId);
      }
    });
    if (inline) {
      const tempArray = attrArray.map(attrId => ObjectAttributeModel.find({ attrId }).exec());
      const result = await Promise.all(tempArray);
      temAttr.AttrExample.attribute = result;
      return temAttr;
    }
    const foreignObjectArray = await resourceModel.find({}).select(condition).exec();
    foreignObjectArray.forEach((foreignObject) => {
      let updateObject = '';
      const tempObject = foreignObject;
      Object.keys(foreignObject).forEach((key) => {
        if (key === 'name') {
          updateObject += foreignObject[key];
        } else {
          updateObject += `(${foreignObject[key]})`;
        }
      });
      tempObject.showItem = updateObject;
    });
    temAttr.AttrExample.attribute = foreignObjectArray;
    return temAttr;
  }

  /**
   * 用于实例化渲染所有属性
   *
   * @static
   * @param {any} ctx
   * @memberof Resource
   */
  static async displayResourceAttr(ctx) {
    const { ResourceID } = ctx.params;
    // const attrInstanceArray = [];
    try {
      const attrs = await ObjectAttributeModel.find({ ResourceID }).select('-_id -__v').exec();
      const attrInstanceArray = attrs.map((attr) => {
        if (attr.AttrType === 'SingleForeignKey' || attr.AttrType === 'MultipleForeignKey') {
          return Resource.getForeignKeyResource(attr);
        }
        return new Promise((resolve) => {
          resolve(attr);
        });
      });
      await Promise.all(attrInstanceArray).then((result) => {
        ctx.body = result;
      });
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = Resource;

/**
 * 资源模型管理基础接口逻辑层(首页展示及侧边栏)
 */

const mongoose = require('mongoose');
const ModelDatabase = require('../model/');

const CardsModel = mongoose.model('CardsModel');

class BasicModel {
  static async initModel(ctx) {
    ctx.body = 'test';
  }
  static async displayCards(ctx) {
    try {
      const cardList = await CardsModel.find({}).select('-_id -__v').exec((err, docs) => {
        if (err) return err;
        return docs.name;
      });
      ctx.body = cardList;
    } catch (error) {
      ctx.body = error;
    }
  }
  // static async displaySlidebar(ctx) {

  // }
}

module.exports = BasicModel;

/**
 * models 层汇总，综合调度
 */

const ObjectModel = require('./resourceModel/object.model');
const AttributeModel = require('./resourceModel/attributes.model');
const CardsModel = require('./resourceModel/cards.model');
const ResourceSchema = require('./resourceModel/resource.model');

module.exports = {
  ObjectModel,
  AttributeModel,
  CardsModel,
  ResourceSchema
};

/**
 * cmdb 的接口url
 */

const Router = require('koa-router');
const BasicModel = require('../controller/');
const AttributeModel = require('../controller/attribute');
const ObjectModel = require('../controller/object');
const ResourceModel = require('../controller/resource');

const router = new Router({
  prefix: '/cmdb'
});
router.get('/object/init', BasicModel.initModel)
  .get('/object/cards', BasicModel.displayCards)
  .post('/object/create', ObjectModel.createObject)
  .get('/object/detail/:ResourceID', ObjectModel.getObjectDetail)
  .post('/object/modify', ObjectModel.modifyResourceModel)
  .post('/object/delete', ObjectModel.deleteObject)
  .get('/object/attr', AttributeModel.displayDetailAttr)
  .get('/object/attrs/:ResourceID', AttributeModel.displayObjectAttr)
  .post('/object/createAttr', AttributeModel.createObjectAttr)
  .post('/object/deleteAttr', AttributeModel.deleteObjectAttr)
  .get('/resource/:ResourceID', ResourceModel.getResource)
  .post('/resource/:ResourceID/create', ResourceModel.createResource);
//  .get('/object/detail/:id', Model.displayObjectDetail);


module.exports = router;

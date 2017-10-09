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
  .get('/object/allAttrList', AttributeModel.displayAllAttrList)
  .get('/object/awailableAttrList', AttributeModel.displayAwailableAttrList)
  .post('/object/updateDisplayList', AttributeModel.updateDisplayList)
  .get('/resource/:ResourceID', ResourceModel.getResource)
  .get('/resource/attrs/:ResourceID', ResourceModel.displayResourceAttr)
  .post('/resource/:ResourceID/create', ResourceModel.createResource)
  .post('/resource/:ResourceID/:name/delete', ResourceModel.deleteResource)
  .post('/resource/:ResourceID/update', ResourceModel.updateResource);
//  .get('/object/detail/:id', Model.displayObjectDetail);


module.exports = router;

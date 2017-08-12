/**
 * apidoc -f ".*\\.js$" -i api/  -o apidoc/
 * @apiDefine CODE_200
 * @apiSuccess (Response 200) {number} code 200
 * @apiSuccess (Response 200) {json} [data='""'] if any data return
 * @apiSuccessExample {json} Response 200 Example
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 200,
 *     "msg": "request success!",
 *     "data": ""
 *   }
 */

/**
 * @apiDefine CODE_500
 * @apiSuccess (Response 500) {number} code 500
 * @apiSuccess (Response 500) {string} [message] error description
 * @apiSuccessExample {json} Response 500 Example
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *      "code": 500,
 *      "msg": "request error",
 *      "data": ""
 *   }
 */

/**
 * @apiDefine DATA
 * @apiParam (data) {string} [firstname]
 */

/**
 * @api {post} /cmdb/object/create
 * @apiDescription 新增资源模型接口，资源ID，资源名称，资源类型必填，其中资源类型需对应三个选项
 * @apiName createObjectModel
 * @apiGroup Object
 *
 * @apiParam {String} ResourceID 资源ID，必填（英文）
 * @apiParam {String} ResourceName 资源名称(自填),必填
 * @apiParam {String} Category 资源类型[业务资源模型，基础资源模型，组织信息模型 ]，必选
 * @apiParam {String} Memo 说明，可选填
 * @apiParamExample {json} create reourceModel success return example
 *   POST /cmdb/object/create
 *   {
 *    "code": 0,
 *    "msg": "success",
 *    "data": {
 *        "__v": 0,
 *        "id": "596effc9bfba208e061ee595",
 *        "name": "test3",
 *        "_id": "596effc9bfba208e061ee596"
 *     }
 *   }
 * @apiUse CODE_200
 * @apiUse CODE_500
 */

/**
 * @api {get} /cmdb/object/cards
 * @apiDescription 获取所有资源模型的基础属性，用于首页标题展示及外键关联时候的标题展示
 * @apiName displayCards
 * @apiGroup Object
 *
 * @apiParamExample get resourceModel cards success return example
 *   GET /cmdb/object/cards
 *    {
 *        "code": 0,
 *        "msg": "success",
 *        "data": [
 *            {
 *                "resourceName": "业务资源模型",
 *                "resourceData": {
 *                       "name": "test",
 *                       "ResourceID": "test",
 *                       "Category": "业务资源模型"
 *                }
 *            }
 *        ]
 *    }
 */

/**
 * @api {get} /cmdb/object/detail/:ResourceID
 * @apiDescription 用于获取具体某个模型对象的详情,路由最后需提供ResourceID，用以查询具体的对象
 * @apiName getResourceModelDetail
 * @apiGroup Object
 *
 * @apiParamExample {json} get resourceModel detail success return example
 *   GET  /cmdb/object/detail/:ResourceID
 * {
 *   "code": 0,
 *   "msg": "success",
 *   "data": {
 *       "ResourceID": "test",
 *       "ResourceName": "测试",
 *       "Category": "业务资源模型",
 *       "Memo": "test",
 *       "Detail": []
 *   }
 * }
 */

/**
 * @api {post} /cmdb/object/delete
 * @apiDescription 接口用于删除一个资源模型,需提供ResourceID
 * @apiName deleteResourceModel
 * @apiGroup Object
 *
 * @apiParam {String} ResourceID
 * @apiParamExample {json} delete a specific resourceModel success return example
 *  POST /cmdb/object/delete
 * {
 *   "code": 0,
 *   "msg": "success",
 *   "data": "remove test1 successfully"
 *  }
 */

/**
 * @api {post} /cmdb/object/modify
 * @apiDescription 接口用于修改一个资源模型,需提供ResourceID
 * @apiName modifyResourceModel
 * @apiGroup Object
 *
 * @apiParam {String} ResourceID
 * @apiParamExample {json} modify a specific resourceModel success return example
 * POST /cmdb/object/delete
 * {
 *    "code": 0,
 *    "msg": "success",
 *    "data": {
 *        "n": 1,
 *        "nModified": 1,
 *        "ok": 1
 *    }
 *  }
 */

/**
 * @api {get} /cmdb/object/attr
 * @apiDescription 接口用于获取具体一个模型的具体一个属性,get路由后面需带上参数ResourceID及AttrId
 * @apiName getObjectSpecificAttr
 * @apiGroup Object
 *
 * @apiParam {String} ResourceID
 * @apiParam {String} AttrId
 * @apiParamExample {json} get a specific resouceModel attibute
 *  {
 *     "code": 0,
 *     "msg": "success",
 *     "data": {
 *         "ResourceID": "test",
 *         "AttrId": "co",
 *         "AttrName": "mingzhi",
 *         "AttrType": "String",
 *         "AttrExample": "",
 *         "AttrClassify": "",
 *         "AttrRequired": false,
 *         "AttrReadOnly": false,
 *         "AttrUnique": false
 *     }
 * }
 */

/**
 * @api {get} /cmdb/object/attrs/:{ResourceID}
 * @apiDescription 接口用于获取一个模型的所有属性,需在路由最后提供ResourceID
 * @apiName getObjectAttrs
 * @apiGroup Object
 *
 * @apiSuccessExample {json} app model properties
 *   GET /cmdb/object/attrs/:{ResourceID}
 *   {
 *      "code": 0,
 *      "msg": "success",
 *      "data": [
 *          {
 *              "ResourceID": "test",
 *              "AttrId": "lkl",
 *              "AttrName": "mingzhi",
 *              "AttrType": "String",
 *              "AttrExample": "",
 *              "AttrClassify": "",
 *              "AttrRequired": false,
 *              "AttrReadOnly": false,
 *              "AttrUnique": false
 *          },
 *          {
 *              "ResourceID": "test",
 *              "AttrId": "co",
 *              "AttrName": "mingzhi",
 *              "AttrType": "String",
 *              "AttrExample": "",
 *              "AttrClassify": "",
 *              "AttrRequired": false,
 *              "AttrReadOnly": false,
 *              "AttrUnique": false
 *          }
 *      ]
 *   }
 */

/**
 * @api {post} /cmdb/object/createAttr
 * @apiDescription 接口用于新增一个模型属性，需注意属性类型的值要在选项里面,而例子则要返回数组类型
 * @apiName createObjectAttr
 * @apiGroup Object
 *
 * @apiParam {String}  ResourceID 资源的ID（必填）
 * @apiParam {String}  AtrrId 属性的ID（英文格式）
 * @apiParam {String}  AttrName 属性名字(用于页面展示)
 * @apiParam {Enum}  AttrType 属性类型，枚举型['String', 'Number', 'Date', 'TimeStamp', 'Enum', 'Array', 'SingleForeignKey', 'MultipleForeignKey']
 * @apiParam {Array}  AttrExample 例子，数组类型，取决于属性类型，只有enum，SingleForeignKey,MultipleForeignKey才需要
 * @apiParam {String}  AttrClassify 自定义
 * @apiParam {Boolean}  AttrRequired 属性是否必须,布尔类型
 * @apiParam {Boolean}  AttrReadOnly 属性是否只读,布尔类型
 * @apiParam {Boolean}  AttrUnique 属性是否唯一,布尔类型
 * @apiParamExample {json} create resourceModel attributes success return example
 *   POST /cmdb/object/createAttr
 *      {
 *          "code": 0,
 *          "msg": "success",
 *          "data": {
 *              "n": 1,
 *              "nModified": 1,
 *              "ok": 1
 *          }
 *      }
 */

/**
 * @api {post} /cmdb/object/deleteAttr/:AttrId
 * @apiDescription 接口用于删除一个具体的模型属性，需提供属性ID
 * @apiName deleteObjectAttr
 * @apiGroup Object
 *
 * @apiParam {String} AttrId 属性的ID（必填)
 * @apiParamExample {json} delete specific resourceModel attribute success return example
 * POST /cmdb/object/deleteAttr
 * {
 *   "code": 0,
 *   "msg": "success",
 *   "data": "删除fdfdfdf成功!"
 *  }
 */

/**
 * @api {get} /resource/:ResourceID
 * @apiDescription 用于初始化以及获取新建资源【模型实例化】
 * @apiName getResource
 * @apiGroup Resource
 *
 * @apiSuccessExample {json} app resource instance
 * GET /cmdb/resource/:ResourceID
 * {
 *    "code": 0,
 *    "msg": "success",
 *    "data": [
 *        {
 *            "co": "test",
 *            "lkl": "test",
 *            "loginTime": "2017-07-25T09:54:09.670Z",
 *            "name": "名字"
 *        },
 *        {
 *            "co": "hha",
 *            "lkl": "haha",
 *            "loginTime": "2017-07-25T09:54:09.670Z",
 *            "name": "fdfdfd"
 *        },
 *        {
 *            "co": "hha",
 *            "lkl": "haha",
 *            "loginTime": "2017-07-25T09:54:09.671Z",
 *            "name": "fdrttrtr"
 *        },
 *        {
 *            "co": "hha",
 *            "lkl": "haha",
 *            "loginTime": "2017-07-25T09:29:47.422Z",
 *            "name": "kolalal"
 *        }
 *    ]
 *}
 */

/**
 * @api {post} /resource/:ResourceID/create
 * @apiDescription 用于新建新的资源【模型实例化】，资源模型为动态创建，以下格式不固定 注：「此接口需在调用初始化接口后才可调用！！
 * @apiName createResource
 * @apiGroup Resource
 *
 * @apiParam {String} name 名称(必填)
 * @apiSuccessExample {json} app create resource instance
 * {
 *   "code": 0,
 *   "msg": "success",
 *   "data": {
 *       "__v": 0,
 *       "co"[动态]: "测试",
 *       "lkl"[动态]: "测试",
 *       "_id": "5977162fd9d6ba07a1a11093",
 *       "loginTime"[固定]: "2017-07-25T09:58:07.549Z",
 *       "name"[固定]: "案例"
 *   }
 *}
 * */

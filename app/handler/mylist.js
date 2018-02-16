

/**
 * Created by WebrexStudio on 5/13/17.
 */
const MylistModel = require(APP_MODEL_PATH + 'mylist').MylistModel;
const BookmarkModel = require(APP_MODEL_PATH + 'bookmark').BookmarkModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const sendAndroidNotification = require(APP_HANDLER_PATH + 'myModule').sendAndroidNotification;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const mongoose = require('mongoose');

class MylistHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    /**
* @swagger
* /mylists:
*   post:
*     tags:
*       - Mylist
*     description: activity object
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: token authorization
*         in: header
*         required: true
*         type: string
*       - name: Content-Type
*         description: content-type
*         in: header
*         required: true
*         type: string
*         default: application/json
*       - name: listName
*         description: listName
*         in: body
*         required: true
*         type: string
*       - name: userId
*         description: userId
*         in: body
*         required: true
*         type: string
*       - name: stores
*         description: offerId
*         in: body
*         required: true
*         type: array
*         schema:
*          $ref: '#/definitions/UpdateActivitiesObj'
*     responses:
*       200:
*         description: object of activity".
*/

    /**
     * @swagger
     * /mylists/{mylistId}:
     *   put:
     *     tags:
     *       - Mylist
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: Content-Type
     *         description: content-type
     *         in: header
     *         required: true
     *         type: string
     *         default: application/json
     *       - name: listName
     *         description: listName
     *         in: body
     *         type: string
     *       - name: mylistId
     *         description: mylistId
     *         in: path
     *         required: true
     *         type: string
     *       - name: userId
     *         description: userId
     *         in: body
     *         type: string
     *       - name: stores
     *         description: stores
     *         in: body
     *         type: array
     *         schema:
     *          $ref: '#/definitions/UpdateActivitiesObj'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /mylists/{mylistId}:
     *   get:
     *     tags:
     *       - Mylist
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: Content-Type
     *         description: content-type
     *         in: header
     *         required: true
     *         type: string
     *         default: application/json
     *       - name: mylistId
     *         description: mylistId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /mylists:
     *   get:
     *     tags:
     *       - Mylist
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: Content-Type
     *         description: content-type
     *         in: header
     *         required: true
     *         type: string
     *         default: application/json
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /mylists/user/{userId}:
     *   get:
     *     tags:
     *       - Mylist
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: Content-Type
     *         description: content-type
     *         in: header
     *         required: true
     *         type: string
     *         default: application/json
     *       - name: userId
     *         description: userId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /mylists/{mylistId}:
     *   delete:
     *     tags:
     *       - Mylist
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: Content-Type
     *         description: content-type
     *         in: header
     *         required: true
     *         type: string
     *         default: application/json
     *       - name: mylistId
     *         description: mylistId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".
     */

    /**
    * @swagger
    * definition:
    *   UpdateActivitiesObj:
    *     properties:
    *       listName:
    *         type: string
    *         required: true
    *       userId:
    *         type: string
    *         required: true
    *       stores:
    *         type: array
    *         items:
    *          type: string
    */
    static get MYLIST_VALIDATION_SCHEME() {
        return {
            'listName': {
                notEmpty: false,
                errorMessage: 'list title required'
            },
        };
    }

    createNewMylist(user, req, callback) {
        let data = req.body;
        let ModelData = {};
        let validator = this._validator;
        req.checkBody(MylistHandler.MYLIST_VALIDATION_SCHEME);
        req.checkBody('stores', 'minimum one list is required').notEmpty();
        req.checkBody('userId', 'userId is required').notEmpty();
        req.checkBody('userId', 'Invalid userId provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new MylistModel(data);
            })
            .then((mylist) => {
                mylist.save();
                return mylist;
            }).then((store) => {
                // console.log(store.stores)
                // var storesIds = [] 
                // for(var i=0;i<store.stores.length;i++){
                //     storesIds.push(mongoose.Types.ObjectId(store.stores[i]))
                // }
                // console.log(typeof storesIds[0])
                
                // UserModel.aggregate(
                //     { "$match": { "storeId": { "$in": storesIds } } },
                //     function (err, stores) {
                //         if (err !== null) {
                //             return err;
                //         } else {
                //             if (!stores) {
                //                 return new NotFoundError("Offer not found");
                //             } else {
                //                 for(var j=0;j<stores.length;j++)
                //                 {
                //                     let ModelData = {};
                //                     ModelData['storeId'] = stores[j].storeID
                //                     ModelData['title'] = 'title'
                //                     ModelData['deviceToken'] = 'deviceToken'
                //                     ModelData['deviceType'] =  stores[j].deviceType
                //                     ModelData['notificationType'] = 'bookmark'
                //                     ModelData['description'] =  stores[j].name+' has added your store to his list';
                //                     StoreNotificationModel(ModelData).save();
                //                 }
                //             }
                //         }
                //     })
                
                // if ( ModelData['type']) {}
                // console.log(MyModule)
                // console.log(MyModule.MyModuleHandler)
                // this.sendAppleNotification(ModelData)
                // this.sendAndroidNotification(ModelData)
                
                return store;
            }).then((store) => {
                var storesIds = [] 
                for(var i=0;i<store.stores.length;i++){
                    storesIds.push(mongoose.Types.ObjectId(store.stores[i]))
                }
                UserModel.aggregate(
                    { "$match": { "storeId": { "$in": storesIds } } },
                        function (err, stores) {
                        if (err !== null) {
                            return err;
                        } else {
                            if (!stores) {
                                return new NotFoundError("Store not found");
                            } else {
                                for(var j=0;j<stores.length;j++)
                                {
                                    ModelData['storeId'] = stores[j].storeID
                                    ModelData['title'] = 'title'
                                    ModelData['deviceToken'] = stores[j].deviceToken
                                    ModelData['deviceType'] =  stores[j].deviceType
                                    ModelData['notificationType'] = 'mylist'
                                    ModelData['description'] =  stores[j].name+' has bookmarked your store';
                                    StoreNotificationModel(ModelData).save();
                                    if(ModelData['deviceToken']){
                                        if (ModelData['deviceType'] == 'android') {
                                            sendAndroidNotification(ModelData)
                                        } else if (ModelData['deviceType'] == 'ios') {
                                            sendAppleNotification(ModelData)
                                        } 
                                    }
                                }
                            }
                        }
                })                
            return store;
        })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteMylist(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();

        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    MylistModel.findOne({ _id: req.params.id }, function (err, mylist) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!mylist) {
                                reject(new NotFoundError("Mylist not found"));
                            } else {
                                resolve(mylist);
                            }
                        }
                    })
                });
            })
            .then((mylist) => {
                mylist.remove();
                return mylist;
            })
            .then((saved) => {
                callback.onSuccess({}, "Mylist id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateMylist(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        if (req.body.stores != undefined) {
            req.checkBody('stores', 'minimum one list is required').notEmpty();
        }
        if (req.body.title != undefined) {
            req.checkBody(MylistHandler.MYLIST_VALIDATION_SCHEME);

        }
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function (resolve, reject) {
                    MylistModel.findOne({ _id: req.params.id }, function (err, mylist) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!mylist) {
                                reject(new NotFoundError("Mylist not found"));
                            } else {
                                resolve(mylist);
                            }
                        }
                    })
                });
            })
            .then((mylist) => {
                var temp = []
                for (var key in data) {
                    if (key == 'stores') {
                        var concatedArray = mylist[key].concat(data[key])
                        for (var i = 0; i < concatedArray.length; i++) {
                            if (temp.indexOf(concatedArray[i].toString()) == -1) {
                                temp.push(concatedArray[i].toString());
                            }
                        }
                        mylist[key] = temp
                    } else if (data.hasOwnProperty(key)) {
                        mylist[key] = data[key];
                    }
                }
                mylist.save();
                return mylist;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getUserMylist(user, req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }

            return new Promise(function (resolve, reject) {
                MylistModel.find({ userId: req.params.id }).populate('stores').lean().exec(function (err, mylist) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!mylist) {
                            reject('my list not found');
                        } else {
                            resolve(mylist);
                        }
                    }
                })
            });
        }).then((results) => {
            if (results != undefined) {
                var promises = [];
                for (var i = 0; i < results.length; i++) {
                    for (var j = 0; j < results[i].stores.length; j++) {
                        if (results[i].stores[j].bookmarkBy == undefined) {
                            results[i].stores[j].bookmarkBy = [];
                        }
                        results[i].stores[j].is_bookmarked_by_me = false;
                        results[i].stores[j].bookmarkCount = results[i].stores[j].bookmarkBy.length;

                        for (var k = 0; k < results[i].stores[j].bookmarkBy.length; k++) {
                            if (results[i].stores[j].bookmarkBy[k] == user.id) {
                                results[i].stores[j].is_bookmarked_by_me = true;
                                break;
                            }
                        }

                        promises.push(this.getStoreCatalog(i, j, results[i].stores[j]._id));
                    }
                }
            }

            return new Promise(function (resolve, reject) {
                Promise.all(promises).then(function (catalogInfo) {
                    for (let i = 0; i < catalogInfo.length; i++) {
                        results[catalogInfo[i][0]].stores[catalogInfo[i][1]]['catalogInfo'] = catalogInfo[i][2];
                    };
                    resolve(results);
                });
            });
        }).then((mylist) => {
            callback.onSuccess(mylist);
        }).catch((error) => {
            callback.onError(error);
        });
    }

    getStoreCatalog(i, j, storeId) {
        return new Promise(function (resolve, reject) {
            CatalogModel.find({ storeId: storeId }).limit(3).lean().exec(function (err, catalog) {
                return resolve([i, j, catalog]);
            })
        });
    }


    // getUserMylist(user, req, callback) {
    //     let data = req.body;
    //     req.checkParams('id', 'Invalid id provided').isMongoId();
    //     req.getValidationResult()
    //         .then(function(result) {
    //             if (!result.isEmpty()) {
    //                 let errorMessages = result.array().map(function (elem) {
    //                     return elem.msg;
    //                 });
    //                 throw new ValidationError(errorMessages);
    //             }
    //             return new Promise(function(resolve, reject) {
    //             MylistModel.aggregate([
    //                 { "$match": { "userId": { "$in": [mongoose.Types.ObjectId(req.params.id)] }} },
    //                 {
    //                     $unwind: {
    //                         path: "$stores",
    //                         preserveNullAndEmptyArrays: true
    //                     }
    //                 },
    //                 {
    //                     "$lookup": {
    //                         "from": 'stores',
    //                         "localField": "stores",
    //                         "foreignField": "_id",
    //                         "as": "storesInfo"
    //                     }
    //                 }, 
    //                 {
    //                     "$lookup": {
    //                         "from": 'catalogs',
    //                         "localField": "stores",
    //                         "foreignField": "storeId",
    //                         "as": "catalogsInfo"
    //                     }
    //                 },
    //                 {
    //                     "$lookup": {
    //                         "from": 'catalogs',
    //                         "localField": "storesInfo.featureCatalog",
    //                         "foreignField": "_id",
    //                         "as": "featureCatalog"
    //                     }
    //                 },
    //                 {
    //                     $project: {
    //                         _id: 1,
    //                         listName: 1,
    //                         userId: 1,
    //                         storesInfo:{
    //                             _id: 1,
    //                             storeName:1,
    //                             storeLogo:1,
    //                             storeBanner:1,
    //                             avgRating:1,
    //                             address:1,      
    //                             bookmarkBy:1,      
    //                             catalogsInfo: {
    //                                 $filter: { input: "$catalogsInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } }, 
    //                             },  
    //                             featureCatalog: {
    //                                 $filter: { input: "$featureCatalog", as: "a", cond: { $ifNull: ["$$a._id", true] } },                          
    //                             },                 
    //                         },
    //                     }
    //                 },
    //                 {
    //                     $group: {
    //                         _id : "$_id",
    //                         listName : { $first : "$listName"},
    //                         userId : { $first : "$userId"},
    //                         storesInfo:{ $addToSet: '$storesInfo' },
    //                     },
    //                 },
    //                 ]).exec(function(err, results){
    //                     if (results[0] != undefined) {
    //                         for (var i = 0; i < results[0]['storesInfo'].length; i++) {
    //                             if(results[0]['storesInfo'][i][0] == undefined) {
    //                                 results[0]['storesInfo'][i][0] = {}
    //                             }
    //                             if (results[0]['storesInfo'][i][0].bookmarkBy == undefined) {
    //                                 results[0]['storesInfo'][i][0].bookmarkBy = [];
    //                             }
    //                             for (var j = 0; j < results[0]['storesInfo'][i][0].bookmarkBy.length; j++) {
    //                                 results[0]['storesInfo'][i][0].isBookmarked = (results[0]['storesInfo'][i][0].bookmarkBy[j]).toString()==(req.params.id)?true:false;
    //                             }
    //                         }   
    //                     }
    //                     resolve(results);
    //                 })
    //             });
    //         }).then((results) => {
    //             if (results[0] != undefined && results[0]['storesInfo'] != undefined) {
    //                 var promises = [];
    //                 for (var i = 0; i < results[0]['storesInfo'].length; i++) {
    //                     promises.push(this.checkBookmark(i, [results[0]['storesInfo'][i][0].id],req.params.id));

    //                 }
    //             }
    //             return new Promise(function (resolve, reject) {
    //                 Promise.all(promises).then(function (storesInfo) {
    //                     for (let i = 0; i < storesInfo.length; i++) {
    //                         results[0]['storesInfo'][storesInfo[i][0]][0].bookmarkId = storesInfo[i][1][0].id;
    //                     };
    //                     resolve(results);
    //                 });
    //             });
    //         })
    //         .then((mylist) => {
    //             callback.onSuccess(mylist);
    //         })
    //         .catch((error) => {
    //             callback.onError(error);
    //         });
    // }

    getUserOnlyMylist(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                MylistModel.aggregate([
                    { "$match": { "userId": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
                    {
                        $project: {
                            _id: 1,
                            listName: 1
                        }
                    }
                ]).exec(function (err, results) {
                    resolve(results);
                })
            });
        })
            .then((mylist) => {
                callback.onSuccess(mylist);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleMylist(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    MylistModel.aggregate(
                        { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
                        {
                            $unwind: {
                                path: "$stores",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'stores',
                                "localField": "stores",
                                "foreignField": "_id",
                                "as": "storesInfo"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'catalogs',
                                "localField": "stores",
                                "foreignField": "storeId",
                                "as": "catalogsInfo"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'catalogs',
                                "localField": "storesInfo.featureCatalog",
                                "foreignField": "_id",
                                "as": "featureCatalog"
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                listName: 1,
                                userId: 1,
                                storesInfo: {
                                    _id: 1,
                                    storeName: 1,
                                    storeLogo: 1,
                                    storeBanner: 1,
                                    avgRating: 1,
                                    address: 1,
                                    catalogsInfo: {
                                        $filter: { input: "$catalogsInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                                    },
                                    featureCatalog: {
                                        $filter: { input: "$featureCatalog", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                                    },
                                },
                            }
                        },
                        {
                            $group: {
                                _id: "$_id",
                                listName: { $first: "$listName" },
                                userId: { $first: "$userId" },
                                storesInfo: { $addToSet: '$storesInfo' },
                            },
                        },
                        function (err, mylist) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!mylist) {
                                    reject(new NotFoundError("mylist not found"));
                                } else {
                                    resolve(mylist);
                                }
                            }
                        })
                });
            })
            .then((mylist) => {
                callback.onSuccess(mylist);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllMylists(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            MylistModel.aggregate(
                {
                    $unwind: {
                        path: "$stores",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    "$lookup": {
                        "from": 'stores',
                        "localField": "stores",
                        "foreignField": "_id",
                        "as": "storesInfo"
                    }
                },
                {
                    "$lookup": {
                        "from": 'catalogs',
                        "localField": "stores",
                        "foreignField": "storeId",
                        "as": "catalogsInfo"
                    }
                },
                {
                    "$lookup": {
                        "from": 'catalogs',
                        "localField": "storesInfo.featureCatalog",
                        "foreignField": "_id",
                        "as": "featureCatalog"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        listName: 1,
                        userId: 1,
                        storesInfo: {
                            _id: 1,
                            storeName: 1,
                            storeLogo: 1,
                            storeBanner: 1,
                            avgRating: 1,
                            address: 1,
                            catalogsInfo: {
                                $filter: { input: "$catalogsInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                            },
                            featureCatalog: {
                                $filter: { input: "$featureCatalog", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                            },
                        },
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        listName: { $first: "$listName" },
                        userId: { $first: "$userId" },
                        storesInfo: { $addToSet: '$storesInfo' },
                    },
                },
                function (err, mylist) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!mylist) {
                            reject(new NotFoundError("mylist not found"));
                        } else {
                            resolve(mylist);
                        }
                    }
                });
        })
            .then((mylist) => {
                callback.onSuccess(mylist);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = MylistHandler;
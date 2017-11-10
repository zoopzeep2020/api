/**
 * Created by crosp on 5/13/17.
 */
const MylistModel = require(APP_MODEL_PATH + 'mylist').MylistModel;
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

    createNewMylist(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(MylistHandler.MYLIST_VALIDATION_SCHEME);
        req.checkBody('stores', 'minimum one list is required').notEmpty();
        req.getValidationResult()
            .then(function(result) {
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
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    MylistModel.findOne({ _id: req.params.id }, function(err, mylist) {
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
        req.checkBody(MylistHandler.MYLIST_VALIDATION_SCHEME);
        if(req.body.categoriesIds != undefined){
            req.checkBody('list', 'minimum one list is required').notEmpty();
        }
        
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function(resolve, reject) {
                    MylistModel.findOne({ _id: req.params.id }, function(err, mylist) {
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
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
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
    
    getUserMylist(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                MylistModel.aggregate([
                    { "$match": { "userId": { "$in": [mongoose.Types.ObjectId(req.params.id)] }} },
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
                            "as": "storeInfo"
                        }
                    }, 
                    {
                        $unwind: {
                            path: "$storeInfo",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            userId: 1,
                            listName: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            storeInfo:{
                                _id: 1,
                                storeName: 1,
                                storeLogo: 1,
                                storeBanner: 1,
                            },                      
                        }
                    },
                    ]).exec(function(err, results){
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
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    MylistModel.findOne({ _id: req.params.id }).populate({ path: 'stores', select: ['storeName', 'storeLogo', 'storeBanner'],  model: 'Store'  }).exec(function(err, mylist) {
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
                callback.onSuccess(mylist);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllMylists(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            MylistModel.find().populate({ path: 'stores', select: ['storeName', 'storeLogo', 'storeBanner'],  model: 'Store'  }).exec(function(err, mylist) {
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
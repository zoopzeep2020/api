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
                    MylistModel.findOne({ _id: req.params.id }).populate({ path: 'stores', select: ['storeName', 'storeLogo'],  model: 'Store'  }).exec(function(err, mylist) {
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
            MylistModel.find().populate({ path: 'stores', select: ['storeName', 'storeLogo'],  model: 'Store'  }).exec(function(err, mylist) {
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
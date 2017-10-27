/**
 * Created by crosp on 5/13/17.
 */
const KeywordModel = require(APP_MODEL_PATH + 'keyword').KeywordModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const mongoose = require('mongoose');
class KeywordHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get KEYWORD_VALIDATION_SCHEME() {
        return {
            'title': {
                isLength: {
                    options: [{ min: 2  }],
                    errorMessage: 'Keyword title must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'Keyword title required'
            },
        };
    }

    createNewKeyword(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(KeywordHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new KeywordModel(data);
            })
            .then((keyword) => {
                keyword.save();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteKeyword(req, callback) {
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
                    KeywordModel.findOne({ _id: req.params.id }, function(err, keyword) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!keyword) {
                                reject(new NotFoundError("Keyword not found"));
                            } else {
                                resolve(keyword);
                            }
                        }
                    })
                });
            })
            .then((keyword) => {
                keyword.remove();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess({}, "Keyword id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateKeyword(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.checkBody(KeywordHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function(resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function(err, keyword) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!keyword) {
                                reject(new NotFoundError("Keyword not found"));
                            } else {

                                resolve(keyword);
                            }
                        }
                    })
                });
            })
            .then((keyword) => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        keyword[key] = data[key];
                    }
                }  
                keyword.save();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleKeyword(req, callback) {
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
                    KeywordModel.findOne({ _id: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Keyword not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchResult(req, callback) {
        let data = req.body;
        var matchQuery = [];
        var ObjectID = require('mongodb').ObjectID;
        var qString = {};
        for (var param in req.query) {
            qString = {};
            qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param]== "true") ? req.query[param]=="true" : (req.query[param]== "false") ? req.query[param]=="true" : req.query[param];
            matchQuery.push(qString);             
        }
        req.checkQuery('keyword', 'Invalid urlparam').notEmpty()
        req.getValidationResult()
            .then(function(result) {                
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) { 
                    StoreModel.aggregate([
                        { "$unwind" : "$keyword" },
                        { $match: { $and:  matchQuery } }  ,                    
                        {
                            "$lookup": {
                                "from": 'keywords',
                                "localField": "keyword",
                                "foreignField": "_id",
                                "as": "keywordInfo"
                            }
                        },
                        {
                            $project: {
                                storeName:'$storeName',
                                avgRating:'$avgRating',
                                storeLogo:'$storeLogo',
                                storeBanner:'$storeBanner',
                                title:'$keywordInfo.title',
                            }
                        },
                        { "$unwind" : "$title" },
                    ]).exec(function(err, results){
                        resolve(results);
                    })
                });
            })
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllKeywords(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                KeywordModel.find({}, function(err, category) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!category) {
                            reject(new NotFoundError("Keyword not found"));
                        } else {
                            resolve(category);
                        }
                    }
                })
            })
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = KeywordHandler;
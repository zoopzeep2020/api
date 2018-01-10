/**
 * Created by WebrexStudio on 5/13/17.
 */
const KeywordModel = require(APP_MODEL_PATH + 'keyword').KeywordModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const mongoose = require('mongoose');
class KeywordHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    /**
 * @swagger
 * /keywords:
 *   get:
 *     tags:
 *       - Keyword
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: basic authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: maximumvsminimumsecurity
 *     responses:
 *       200:
 *         description: object of activity".     
 */
    /**
 * @swagger
 * /keywords:
 *   post:
 *     tags:
 *       - Keyword
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
 *       - name: title
 *         description: title
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */
    /**
 * @swagger
 * /keywords/{keywordId}:
 *   put:
 *     tags:
 *       - Keyword
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
 *       - name: keywordId
 *         description: keywordId
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: title
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */
    /**
    * @swagger
    * /keywords/{keywordId}:
    *   delete:
    *     tags:
    *       - Keyword
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
    *       - name: keywordId
    *         description: keywordId
    *         in: path
    *         required: true
    *         type: string
    *         schema:
    *          $ref: '#/definitions/UpdateActivitiesObj'
    *     responses:
    *       200:
    *         description: object of activity".
    */
    /**
  * @swagger
  * /keywords/{keywordId}:
  *   get:
  *     tags:
  *       - Keyword
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: basic authorization
  *         in: header
  *         required: true
  *         type: string
  *         default: maximumvsminimumsecurity  
  *       - name: keywordId
  *         description: keywordId
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: object of activity".     
  */

    /**
    * @swagger
    * /keywords/trendingkeyword:
    *   get:
    *     tags:
    *       - Keyword
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: basic authorization
    *         in: header
    *         required: true
    *         type: string
    *         default: maximumvsminimumsecurity  
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
  * @swagger
  * /keywords/search?{keyword}:
  *   get:
  *     tags:
  *       - Keyword
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: basic authorization
  *         in: header
  *         required: true
  *         type: string
  *         default: maximumvsminimumsecurity  
  *       - name: keyword
  *         description: keyword id
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
     *       title:
     *         type: string
     *         required: true
     */
    static get KEYWORD_VALIDATION_SCHEME() {
        return {
            'title': {
                isLength: {
                    options: [{ min: 2 }],
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new KeywordModel(data);
            })
            .then((keyword) => {
                keyword.viewCount = 0
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function (err, keyword) {
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function (resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function (err, keyword) {
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function (err, keyword) {
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
                keyword.viewCount = keyword.viewCount + 1;
                keyword.save();
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchResult(req, callback) {
        let data = req.body;
        var matchQuery = [];
        var objectArray = [];
        var ObjectID = require('mongodb').ObjectID;
        var qString = {};
        for (var param in req.query) {
            qString = {};
            qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
            matchQuery.push(qString);
        }
        req.checkQuery('keyword', 'Invalid urlparam').notEmpty()
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    StoreModel.aggregate([
                        { "$unwind": "$keyword" },
                        { $match: { $and: matchQuery } },
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
                                storeName: '$storeName',
                                avgRating: '$avgRating',
                                storeLogo: '$storeLogo',
                                storeBanner: '$storeBanner',
                                title: '$keywordInfo.title',
                                _id: '$keywordInfo._id',
                                viewCount: '$keywordInfo.viewCount',
                            }
                        },
                        { "$unwind": "$title" },
                        { "$unwind": "$viewCount" },
                        { "$unwind": "$_id" },
                    ]).exec(function (err, results) {
                        for (var i = 0; i < results.length; i++) {
                            objectArray[i] = mongoose.Types.ObjectId(results[i]._id)
                        }
                        resolve(results);
                    })
                });
            })
            .then((keywords) => {
                return new Promise(function (resolve, reject) {
                    KeywordModel.find({ "_id": { $in: objectArray } }, function (err, keywords) {
                        if (err !== null) {
                            reject(new NotFoundError("keyword not found"));
                        } else {
                            if (!keywords) {
                                reject(new NotFoundError("keyword not found"));
                            } else {
                                for (var i = 0; i < keywords.length; i++) {
                                    keywords[i].viewCount = keywords[i].viewCount + 1;
                                    keywords[i].save();
                                }
                                resolve(keywords)
                            }
                        }
                    })
                })
            })
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchResultByWord(req, callback) {
        let data = req.body;
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    KeywordModel.aggregate(
                        { "$match": { "title": { $regex: req.query.search } } },
                        {
                            $project: {
                                _id: '$_id',
                                title: '$title',
                                viewCount: '$viewCount'
                            }
                        }
                    )
                    .exec(function (err, keywords) {
                        resolve(keywords);
                    })
                });
            })
            .then((keywords) => {
                return new Promise(function (resolve, reject) {
                    KeywordModel.find({ "title": { $regex: new RegExp(req.query.search.trim(), 'i') } }, function (err, keywords) {
                        if (err !== null) {
                            reject(new NotFoundError("keyword not found"));
                        } else {
                            if (!keywords) {
                                reject(new NotFoundError("keyword not found"));
                            } else {
                                for (var i = 0; i < keywords.length; i++) {
                                    keywords[i].viewCount = keywords[i].viewCount + 1;
                                    keywords[i].save();
                                }
                                resolve(keywords)
                            }
                        }
                    })
                })
            }).then((keywords) => {
                callback.onSuccess(keywords);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllKeywords(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            KeywordModel.find({}, function (err, keyword) {
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
        }).then((keyword) => {
            callback.onSuccess(keyword);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllTrending(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            KeywordModel.aggregate([{ $sort: { viewCount: -1 }, }, { $limit: 5 }], function (err, keyword) {
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
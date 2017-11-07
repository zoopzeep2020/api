
/**
 * Created by crosp on 5/9/17.
 */
const CollectionModel = require(APP_MODEL_PATH + 'collection').CollectionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');
const mongoose = require('mongoose');

class CollectionHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewCollection(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['collectionPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['collectionPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function(err) {
                            req.body.collectionPicture = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done){
                console.log(req.body)
                console.log(req.files.storId=== undefined)
                if(req.body.collectionPicture != undefined){
                    req.checkBody('collectionPicture', 'collectionPicture is required').isImage(req.body.collectionPicture);
                }else{
                    req.checkBody('collectionPicture', 'collectionPicture is required').notEmpty();
                }       
                req.checkBody('collectionName', 'collectionName is required').notEmpty();
                req.checkBody('collectionType', 'collectionType is required').notEmpty();
                if((req.body.storId === null || req.body.storId === undefined) && (req.body.offerId === null || req.body.offerId === undefined) && (req.body.catalogId === null || req.body.catalogId === undefined)){
                    req.checkBody('storeId','storeId,offerId or catalogId is required').notEmpty();
                }

                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new CollectionModel(data);                    
                })
                .then((collection) => {
                    collection.save();
                    return collection;
                })
                .then((saved) => {
                    callback.onSuccess(saved);      
                    const directory = './uploads';
                    fs.readdir(directory, (err, files) => {
                        if (err) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), err => {
                                if (err) throw error;
                            });
                        }
                    });             
                })
                .catch((error) => {
                    callback.onError(error);
                });
            }
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });
    }

    deleteCollection(req, callback) {
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
                    CollectionModel.findOne({ _id: req.params.id }, function(err, collection) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!collection) {
                                reject(new NotFoundError("collection not found"));
                            } else {
                                resolve(collection);
                            }
                        }
                    })
                });
            })
            .then((collection) => {
                collection.remove();
                return collection;
            })
            .then((saved) => {
                callback.onSuccess({}, "Collection id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCollection(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['collectionPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['collectionPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function(err) {
                            req.body.collectionPicture = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done){
                if(req.body.collectionPicture != undefined){
                    req.checkBody('collectionPicture', 'collectionPicture is required').isImage(req.body.collectionPicture);
                }else{
                    req.checkBody('collectionPicture', 'collectionPicture is required').notEmpty();
                }       
                req.checkBody('collectionName', 'collectionName is required').notEmpty();
                req.checkBody('collectionType', 'collectionType is required').notEmpty();
                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        CollectionModel.findOne({ _id: req.params.id }, function(err, collection) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!collection) {
                                    reject(new NotFoundError("collection not found"));
                                } else {
                                    resolve(collection);
                                }
                            }
                        })
                    });
                })
                .then((collection) => {
                    for (var key in data) {
                        collection[key] = data[key];
                    }  
                    collection.save();
                    return collection;
                })
                .then((saved) => {
                    callback.onSuccess(saved);      
                    const directory = './uploads';
                    fs.readdir(directory, (err, files) => {
                        if (err) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), err => {
                                if (err) throw error;
                            });
                        }
                    });            
                })
                .catch((error) => {
                    callback.onError(error);
                });
            }
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });
    }

    getSingleCollection(req, callback) {
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
                CollectionModel.aggregate([
                    { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] }} },
                    {
                        $unwind: {
                            path: "$storeId",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        $unwind: {
                            path: "$offerId",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        $unwind: {
                            path: "$catalogId",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        "$lookup": {
                            "from": 'stores',
                            "localField": "storeId",
                            "foreignField": "_id",
                            "as": "storesInfo"
                        }
                    },
                    {
                        "$lookup": {
                            "from": 'offers',
                            "localField": "offerId",
                            "foreignField": "_id",
                            "as": "offerInfo"
                        }
                    },
                    {
                        "$lookup": {
                            "from": 'catalogs',
                            "localField": "catalogId",
                            "foreignField": "_id",
                            "as": "catalogInfo"
                        }
                    },
                    {
                        "$lookup": {
                            "from": 'collections',
                            "localField": "_id",
                            "foreignField": "_id",
                            "as": "collectionInfo"
                        }
                    },
                    {
                        $unwind: {
                            path: "$storesInfo",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        $unwind: {
                            path: "$offerInfo",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        $unwind: {
                            path: "$catalogInfo",
                            preserveNullAndEmptyArrays: true
                          }
                    },
                    {
                        $unwind: {
                            path: "$collectionInfo",
                            preserveNullAndEmptyArrays: false
                          }
                    },
                    {
                        $group: {
                            _id : "$_id",
                            collectionInfo:{ $addToSet: '$collectionInfo' },
                            storesInfo:{ $addToSet: '$storesInfo' },
                            offerInfo:{ $addToSet: '$offerInfo' },
                            catalogInfo:{ $addToSet: '$catalogInfo' }
                        },
                    },
                    {
                        $unwind: {
                            path: "$collectionInfo",
                            preserveNullAndEmptyArrays: false
                          }
                    },
                    {
                        $project: {
                            'collectionName':'$collectionInfo.collectionName',
                            'collectionType':'$collectionInfo.collectionType',
                            'collectionPicture':'$collectionInfo.collectionPicture',
                            storesInfo: {
                                $filter: { input: "$storesInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },                            
                            },
                            offerInfo: {
                                $filter: { input: "$offerInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },                            
                            },
                            catalogInfo: {
                                $filter: { input: "$catalogInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },                            
                            }
                        },
                    },
                    { 
                        $project : { 
                            collectionName:1,                    
                            collectionType:1,                    
                            collectionPicture:1,                    
                            storesInfo:{
                                _id: 1,
                                storeName: 1,
                                storeLogo: 1,
                                storeBanner: 1,
                            }, 
                            offerInfo:{
                                _id: 1,
                                offerName: 1,
                                offerPicture: 1,
                                offerDescription: 1,
                            },  
                            catalogInfo:{
                                _id: 1,
                                catalogUrl: 1,
                                catalogDescription: 1,
                            },                               
                        } 
                    },
                ]).exec(function(err, results){
                    resolve(results);
                })
            });
        })
        .then((collection) => {
            callback.onSuccess(collection);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllCollections(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            CollectionModel.find({}, function(err, collections) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(collections);
                }
            }).exec(function(err, results){
                resolve(results);
            })
            })
            .then((posts) => {
                callback.onSuccess(posts);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    objectify(array) {
        return array.reduce(function(p, c) {
             p[c['fieldname']] = c;
             return p;
        }, {});
    }
}

module.exports = CollectionHandler;
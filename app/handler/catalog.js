/**
 * Created by WebrexStudio on 5/13/17.
 */
/**
 * Created by WebrexStudio on 5/9/17.
 */
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const mongoose = require('mongoose');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
var async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');
const url = require('url');
var request = require('request');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class CatalogHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
   
    static get CATALOG_VALIDATION_SCHEME() {
        return {
            'catalogDescription': {
                isLength: {
                    options: [{ min: 2 }],
                    errorMessage: 'Catalog description must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'Catalog description is required'
            }
        };
    }

    createNewCatalog(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['catalogUrl'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['catalogUrl'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['catalogUrl'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.catalogUrl = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done) {
                req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
                if (req.body.catalogUrl != undefined) {
                    req.checkBody('catalogUrl', 'Catalog image is required').isImage(req.body.catalogUrl);
                } else {
                    req.checkBody('catalogUrl', 'Catalog image is required').notEmpty();
                }
                req.getValidationResult()
                    .then(function (result) {
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages);
                        }
                        return new CatalogModel(data);
                    })
                    .then((catalog) => {
                        catalog.save();
                        return catalog;
                    })
                    .then((catalog) => {
                        return new Promise(function (resolve, reject) {
                            StoreModel.findOne({ _id: catalog.storeId }, function (err, store) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!store) {
                                        reject(new NotFoundError("store not found"));
                                    } else {
                                        if (store.featureCatalog == undefined) {
                                            store.featureCatalog = catalog._id
                                        }
                                        store.save();
                                        resolve(catalog);
                                    }
                                }
                            })
                        });
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
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    deleteCatalog(user, req, callback) {
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
                    CatalogModel.findOne({ _id: req.params.id }, function (err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                if (user.isAdmin || (catalog.storeId === user.storeId)) {
                                    resolve(catalog);
                                } else {
                                    reject(new NotFoundError("you are not allow to remove this catalog"));
                                }
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                catalog.remove();
                return catalog;
            })
            .then((saved) => {
                callback.onSuccess({}, "Catalog id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCatalog(req, callback) {
        let ModelData = {}
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['catalogUrl'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['catalogUrl'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['catalogUrl'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.catalogUrl = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done) {
                if (req.body.catalogDescription != undefined) {
                    req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
                }
                if (req.body.catalogUrl != undefined) {
                    req.checkBody('catalogUrl', 'Catalog image is required').isImage(req.body.catalogUrl);
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
                            CatalogModel.findOne({ _id: req.params.id }, function (err, catalog) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!catalog) {
                                        reject(new NotFoundError("Catalog not found"));
                                    } else {
                                        resolve(catalog);
                                    }
                                }
                            })
                        });
                    })
                    .then((catalog) => {
                        for (var key in data) {
                            catalog[key] = data[key];
                        }
                        catalog.save();
                        return catalog;
                    }).then((catalog) => {
                        StoreModel.aggregate(
                            { "$match": { "_id": catalog.storeId } },
                            function (err, store) {
                                if (err !== null) {
                                    return err;
                                } else {
                                    if (!store) {
                                        return new NotFoundError("store not found");
                                    } else {
                                        UserModel.aggregate(
                                            { "$match": { "_id": { "$in": store[0].bookmarkBy } } },
                                            function (err, users) {
                                                if (err !== null) {
                                                    return err;
                                                } else {
                                                    if (!users) {
                                                        return new NotFoundError("user not found");
                                                    } else {
                                                        for (var j = 0; j < users.length; j++) {
                                                            ModelData['storeId'] = users[j].storeID
                                                            ModelData['logo'] = users[j].storeLogo
                                                            ModelData['title'] = 'title'
                                                            ModelData['deviceToken'] = users[j].deviceToken
                                                            ModelData['deviceType'] = users[j].deviceType
                                                            ModelData['notificationType'] = 'bookmark'
                                                            ModelData['description'] = users[j].storeName + ' has updated their catalogue';
                                                            StoreNotificationModel(ModelData).save();
                                                            if (ModelData['deviceToken']) {
                                                                if (ModelData['deviceType'] == 'Android') {
                                                                    sendAndroidNotification(ModelData)
                                                                } else if (ModelData['deviceType'] == 'IOS') {
                                                                    sendAppleNotification(ModelData)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            })
                                    }
                                }
                            })
                        return catalog;
                    }).then((saved) => {
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
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    getFeatureCatalog(req, callback) {
        let data = req.body;
        let maxviewcount = 0;
        let skip = 0;
        let mainObj = [];
        let limit = 10;
        var matchQuery = [{"featureCatalog": {  "$exists": true, "$ne": null }}, { "isActive": true }];
        var ObjectID = require('mongodb').ObjectID;
        var qString = {};
        var trendingResult = 0;
        var arrayFinal = [];
        for (var param in req.query) {
            if ((param !== "lng" && param !== "lat") && (param == "buisnessOnline" || param == "buisnessOffline")) {
                qString = {};
                qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
                matchQuery.push(qString);
            } else if (key == "startCatalogs") {
                skip = parseInt(query[key]);
            } else if (key == "endCatalogs") {
                limit = parseInt(query[key]) - skip + 1;
            }
        }
        var longitude = this.noNaN(parseFloat(req.query.lng));
        var lattitude = this.noNaN(parseFloat(req.query.lat));
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    StoreModel.find({ $and: matchQuery}).skip(skip).limit(limit).populate({ path: 'featureCatalog', select: ['_id', 'storeId', 'catalogDescription', 'catalogUrl'], model: 'Catalog' }).sort().lean().exec(function (err, results) {
                        resolve(results);
                    })
                });
            }).then((results) => {
                return new Promise(function (resolve, reject) {
                    StoreModel.findOne({ "isActive": true }).select('viewCount').sort({ viewCount: -1 }).limit(1).exec(function (err, store) {
                        resolve(store);
                    })
                }).then((maxview) => {
                    maxviewcount = maxview.viewCount
                    // if (results.length < trendingResult) {
                    //     trendingResult = results.length
                    // }
                    trendingResult = results.length
                    for (let i = 0; i < results.length; i++) {
                        var finalTotal = (((5 * results[i].viewCount)) / maxviewcount) + results[i].avgRating;
                        arrayFinal.push([finalTotal, i]);
                    }

                    arrayFinal.sort(sortFunction);
                    function sortFunction(a, b) {
                        if (a[0] === b[0]) {
                            return 0;
                        }
                        else {
                            return (a[0] > b[0]) ? -1 : 1;
                        }
                    }
                    var items = arrayFinal.slice(0, trendingResult);
                    for (var i = 0; i < trendingResult; i++) {
                        if (results[items[i][1]]['featureCatalog'] != null) {
                            mainObj[i] = results[items[i][1]]['featureCatalog']
                        }
                    }
                    return mainObj;
                })
            }).then((results) => {
                callback.onSuccess(results);
                // new Promise(function (resolve, reject) {
                //     StoreModel.aggregate([
                //         // {
                //         //     "$geoNear": {
                //         //         "near": {
                //         //             "type": "Point",
                //         //             "coordinates": [longitude, lattitude]
                //         //         },
                //         //         "distanceField": "distance",
                //         //         "spherical": true,
                //         //         "maxDistance": 0
                //         //     }
                //         // },
                //         // {
                //         //     "$match": { "isActive": 1 == 1 }
                //         // },
                //         {
                //             "$match": { $and: matchQuery }
                //         },
                //         { $skip: skip },
                //         { $limit: limit },
                //         {
                //             $project: {
                //                 finalTotal: {
                //                     $let: {
                //                         vars: {
                //                             total: { $divide: [{ $multiply: ['$viewCount', 5] }, { $max: "$viewCount" }] },
                //                         },
                //                         in: { $add: ["$avgRating", "$$total"] }
                //                     }
                //                 }
                //             }
                //         },
                //         {
                //             "$lookup": {
                //                 "from": 'stores',
                //                 "localField": "_id",
                //                 "foreignField": "_id",
                //                 "as": "storeInfo"
                //             }
                //         },
                //         {
                //             "$lookup": {
                //                 "from": 'catalogs',
                //                 "localField": "storeInfo.featureCatalog",
                //                 "foreignField": "_id",
                //                 "as": "catalogInfo"
                //             }
                //         },
                //         {
                //             $unwind: {
                //                 path: "$storeInfo",
                //                 preserveNullAndEmptyArrays: true
                //             }
                //         },
                //         {
                //             $unwind: {
                //                 path: "$catalogInfo",
                //                 preserveNullAndEmptyArrays: true
                //             }
                //         },
                //         {
                //             $project: {
                //                 _id: '$catalogInfo._id',
                //                 storeId: '$_id',
                //                 featureCatalog: '$catalogInfo.featureCatalog',
                //                 catalogUrl: '$catalogInfo.catalogUrl',
                //                 catalogDescription: '$catalogInfo.catalogDescription',
                //                 finalTotal: '$finalTotal',
                //             }
                //         },
                //         { $sort: { finalTotal: -1 } },
                //     ])
                //     .exec(function (err, results) {
                //         resolve(results);
                //     })
                //     .then((results) => {
                //         callback.onSuccess(results);
                //     })
                // });
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleCatalog(req, callback) {
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
                CatalogModel.findOne({ _id: req.params.id }, function (err, catalog) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!catalog) {
                            reject(new NotFoundError("Catalog not found"));
                        } else {
                            resolve(catalog);
                        }
                    }
                })
            });
        })
        .then((catalog) => {
            callback.onSuccess(catalog);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllCatalogs(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            CatalogModel.find({}, function (err, posts) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            });
        })
        .then((posts) => {
            callback.onSuccess(posts);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getCatalogByStoreId(req, callback) {
        let data = req.body;
        req.checkParams('storeId', 'Invalid storeId provided').isMongoId();
        req.getValidationResult()
        .then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                CatalogModel.find({ storeId: req.params.storeId }, function (err, catalog) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!catalog) {
                            reject(new NotFoundError("Catalog not found"));
                        } else {
                            resolve(catalog);
                        }
                    }
                })
            });
        })
        .then((catalog) => {
            callback.onSuccess(catalog);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getCatalogBySearch(req, callback) {
        let data = req.body;
        let query = req.query;
        let stores = [];
        let mongoQuery = {};
        var queryString = url.parse(req.url, true).search;
        let skip = 0;
        let limit = 10;
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
            }).then(() => {
                return new Promise(function (resolve, reject) {
                    var URLStore = 'http://' + req.get('host') + '/stores/search' + queryString;
                    var optionsStore = {
                        url: URLStore,
                        method: 'GET',
                        headers: req.headers
                    };
                    request(optionsStore, function (error, response, body) {
                        let storesData = JSON.parse(body)['data'];
                        for (let i = 0; i < storesData.length; i++) {
                            stores[i] = storesData[i]._id;
                        }
                        resolve(stores);
                    });
                });
            }).then((stores) => {
                return new Promise(function (resolve, reject) {
                    if (stores) {
                        mongoQuery['storeId'] = { "$in": stores };
                    }

                    for (var key in query) {
                        if (key == "catalogSearch") {
                            mongoQuery['$or'] = [
                                { 'catalogDescription': { $regex: new RegExp(query[key], 'i') } }
                            ]
                        } else if (key == "startCatalogs") {
                            skip = parseInt(query[key]);
                        } else if (key == "endCatalogs") {
                            limit = parseInt(query[key]) - skip + 1;
                        }
                    }

                    CatalogModel.find(mongoQuery).skip(skip).limit(limit).exec(function (err, results) {
                        resolve(results);
                    })
                });
            }).then((catalog) => {
                callback.onSuccess(catalog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    
    // getCatalogBySearch(req, callback) {
    //     let data = req.body;   
    //     var matchQuery = [];
    //     var ObjectID = require('mongodb').ObjectID;
    //     var qString = {};
    //     for (var param in req.query) {
    //         qString = {};
    //         if(param == "buisnessOnline" || param == "buisnessOffline"){
    //             qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param]== "true") ? req.query[param]=="true" : (req.query[param]== "false") ? req.query[param]=="true" : {$regex :req.query[param]};
    //             matchQuery.push(qString);
    //         }             
    //     }  
    //     var longitude = this.noNaN(parseFloat(req.query.lng));
    //     var lattitude = this.noNaN(parseFloat(req.query.lat));
    //     req.getValidationResult()
    //         .then(function(result) {                
    //             if (!result.isEmpty()) {
    //                 let errorMessages = result.array().map(function (elem) {
    //                     return elem.msg;
    //                 });
    //                 throw new ValidationError(errorMessages);
    //             }
    //             return new Promise(function(resolve, reject) { 
    //                 StoreModel.aggregate(
    //                 {
    //                     "$geoNear": {
    //                         "near": {
    //                             "type": "Point",
    //                             "coordinates": [longitude,lattitude]
    //                         },
    //                         "distanceField": "distance",
    //                         "spherical": true,
    //                         "maxDistance": 0
    //                     }
    //                 },
    //                 {$sort:{maxDistance:-1}},
    //                 {
    //                     $match:{$and:matchQuery}
    //                 }
    //             ).exec(function(err, results){
    //                     resolve(results);
    //                 })
    //             });
    //         })
    //         .then((store) => {
    //             let objectAray = [];
    //             for(var i=0;i<store.length;i++){
    //                 objectAray[i] = mongoose.Types.ObjectId(store[i]._id);
    //             }
    //             return new Promise(function(resolve, reject) { 
    //                 CatalogModel.aggregate({$match:{"storeId": { "$in": objectAray }}}).exec(function(err, results){
    //                     resolve(results);
    //                 })
    //             })
    //         }) 
    //         .then((results) => {
    //             callback.onSuccess(results);
    //         })
    //         .catch((error) => {
    //             callback.onError(error);
    //         });
    // }

    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }
    noNaN(n) { return isNaN(n) ? 0 : n; }
}
module.exports = CatalogHandler;
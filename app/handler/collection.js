/**
 * Created by WebrexStudio on 5/9/17.
 */
const CollectionModel = require(APP_MODEL_PATH + 'collection').CollectionModel;
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const CityModel = require(APP_MODEL_PATH + 'city').CityModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');
const mongoose = require('mongoose');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class CollectionHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    

    createNewCollection(req, callback) {
        let ModelData = {};
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['collectionPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['collectionPicture'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.collectionPicture = targetDir + fileName;
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
                if (req.body.collectionPicture != undefined) {
                    req.checkBody('collectionPicture', 'collectionPicture is required').isImage(req.body.collectionPicture);
                } else {
                    req.checkBody('collectionPicture', 'collectionPicture is required').notEmpty();
                }
                req.checkBody('collectionName', 'collectionName is required').notEmpty();
                req.checkBody('collectionType', 'collectionType is required').notEmpty();
                if ((req.body.storId === null || req.body.storId === undefined) && (req.body.offerId === null || req.body.offerId === undefined) && (req.body.catalogId === null || req.body.catalogId === undefined)) {
                    req.checkBody('storeId', 'storeId,offerId or catalogId is required').notEmpty();
                }
                req.getValidationResult()
                    .then(function (result) {
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
                    }).then((collection) => {
                        if (collection.collectionType == 'offer') {
                            var offerIds = []

                            for (var i = 0; i < collection.offerId.length; i++) {
                                offerIds.push(mongoose.Types.ObjectId(collection.offerId[i]))
                            }
                            OfferModel.aggregate(
                                { "$match": { "_id": { "$in": offerIds } } }, function (err, offers) {
                                    if (err !== null) {
                                        return err;
                                    } else {
                                        if (!offers) {
                                            return new NotFoundError("Offer not found");
                                        } else {
                                            var storeIds = [];
                                            for (var j = 0; j < offers.length; j++) {
                                                storeIds.push(mongoose.Types.ObjectId(offers[j].storeId))
                                            }
                                            UserModel.aggregate(
                                                { "$match": { "storeId": { "$in": storeIds } } }, function (err, stores) {
                                                    if (err !== null) {
                                                        return err;
                                                    } else {
                                                        if (!stores) {
                                                            return new NotFoundError("store not found");
                                                        } else {
                                                            for (var j = 0; j < stores.length; j++) {
                                                                ModelData['storeId'] = stores[j].storeID
                                                                ModelData['title'] = 'title'
                                                                ModelData['deviceToken'] = stores[j].deviceToken
                                                                ModelData['deviceType'] = stores[j].deviceType
                                                                ModelData['notificationType'] = 'bookmark'
                                                                ModelData['description'] = 'your store has been added to ' + collection.collectionName;
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
                        } else {
                            var storesIds = []
                            for (var i = 0; i < collection.storeId.length; i++) {
                                storesIds.push(mongoose.Types.ObjectId(collection.storeId[i]))
                            }
                            UserModel.aggregate(
                                { "$match": { "storeId": { "$in": storesIds } } },
                                function (err, stores) {
                                    if (err !== null) {
                                        return err;
                                    } else {
                                        if (!stores) {
                                            return new NotFoundError("Offer not found");
                                        } else {
                                            for (var j = 0; j < stores.length; j++) {
                                                ModelData['storeId'] = stores[j].storeID
                                                ModelData['title'] = 'title'
                                                ModelData['deviceToken'] = 'cFbFZZeGWu8:APA91bEhOIstS0w38G-W21kFOJl2jztIGk2aRf7JfRu6LN1RPgC73csj6ZZlOtLhdbrAZ3cKHe1xPHXD-kAw2jaiAjOQH0picWL-i0qXCvsqHJhlr5A4xUPsm80liG7cr721WZM4fztY'
                                                ModelData['deviceType'] = 'Android'
                                                ModelData['notificationType'] = 'bookmark'
                                                ModelData['description'] = stores[j].name + ' has bookmarked your store';
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
                        return collection;
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

    deleteCollection(req, callback) {
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
                    CollectionModel.findOne({ _id: req.params.id }, function (err, collection) {
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
            function (done, err) {
                if (typeof files['collectionPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['collectionPicture'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.collectionPicture = targetDir + fileName;
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
                if (req.body.collectionPicture != undefined) {
                    req.checkBody('collectionPicture', 'collectionPicture is required').isImage(req.body.collectionPicture);
                } else {
                    req.checkBody('collectionPicture', 'collectionPicture is required').notEmpty();
                }
                req.checkBody('collectionName', 'collectionName is required').notEmpty();
                req.checkBody('collectionType', 'collectionType is required').notEmpty();
                req.getValidationResult()
                    .then(function (result) {
                        var errorMessages = {};
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages);
                        }
                        return new Promise(function (resolve, reject) {
                            CollectionModel.findOne({ _id: req.params.id }, function (err, collection) {
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
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    getStoreCatalog(i, storeId) {
        return new Promise(function (resolve, reject) {
            CatalogModel.find({ storeId: storeId }).limit(3).exec(function (err, catalog) {
                return resolve([i, catalog]);
            })
        });
    }

    getSingleCollection(user, req, callback) {
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
                CollectionModel.findById(req.params.id).lean().populate({ path: 'storeId' }).populate({ path: 'offerId', populate: { path: 'storeId', select: ['storeName'], model: 'Store' } }).exec(function (err, collection) {
                    for (var i = 0; i < collection.offerId.length; i++) {
                        collection.offerId[i].is_claimed_by_me = false;
                        if (collection.offerId[i].claimedOfferBy == undefined) {
                            collection.offerId[i].claimedOfferBy = [];
                        }

                        for (var j = 0; j < collection.offerId[i].claimedOfferBy.length; j++) {
                            if (collection.offerId[i].claimedOfferBy[j] == user.id) {
                                collection.offerId[i].is_claimed_by_me = true;
                                break;
                            }
                        }
                    }
                    resolve(collection);
                })
            });
        }).then((collection) => {
            if (collection != undefined) {
                var promises = [];
                for (var j = 0; j < collection.storeId.length; j++) {
                    if (collection.storeId[j].bookmarkBy == undefined) {
                        collection.storeId[j].bookmarkBy = [];
                    }
                    collection.storeId[j].is_bookmarked_by_me = false;
                    collection.storeId[j].bookmarkCount = collection.storeId[j].bookmarkBy.length;  
                    for (var k = 0; k < collection.storeId[j].bookmarkBy.length; k++) {
                        if (collection.storeId[j].bookmarkBy[k] == user.id) {
                            collection.storeId[j].is_bookmarked_by_me = true;
                            break;
                        }
                    }
                    promises.push(this.getStoreCatalog(j, collection.storeId[j]._id));
                }
            }
            return new Promise(function (resolve, reject) {
                Promise.all(promises).then(function (catalogInfo) {
                    for (let i = 0; i < catalogInfo.length; i++) {
                        collection.storeId[catalogInfo[i][0]]['catalogInfo'] = catalogInfo[i][1];
                    };
                    resolve(collection);
                });
            });
        }).then((collection) => {
            callback.onSuccess(collection);
        }).catch((error) => {
            callback.onError(error);
        });
    }

    // getSingleCollection(user, req, callback) {
    //     let data = req.body;
    //     req.checkParams('id', 'Invalid id provided').isMongoId();
    //     req.getValidationResult()
    //         .then(function (result) {
    //             if (!result.isEmpty()) {
    //                 let errorMessages = result.array().map(function (elem) {
    //                     return elem.msg;
    //                 });
    //                 throw new ValidationError(errorMessages);
    //             }
    //             return new Promise(function (resolve, reject) {
    //                 CollectionModel.findById(req.params.id).lean().populate({ path: 'storeId' }).populate({ path: 'offerId' }).exec(function (err, offers) {

    //                 CollectionModel.aggregate([
    //                     { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
    //                     {
    //                         $unwind: {
    //                             path: "$storeId",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$offerId",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     // {
    //                     //     $unwind: {
    //                     //         path: "$catalogId",
    //                     //         preserveNullAndEmptyArrays: true
    //                     //     }
    //                     // },
    //                     {
    //                         "$lookup": {
    //                             "from": 'stores',
    //                             "localField": "storeId",
    //                             "foreignField": "_id",
    //                             "as": "storesInfo"
    //                         }
    //                     },
    //                     {
    //                         "$lookup": {
    //                             "from": 'offers',
    //                             "localField": "offerId",
    //                             "foreignField": "_id",
    //                             "as": "offerInfo"
    //                         }
    //                     },
    //                     // {
    //                     //     "$lookup": {
    //                     //         "from": 'catalogs',
    //                     //         "localField": "storesInfo._id",
    //                     //         "foreignField": "storeId",
    //                     //         "as": "storesInfo.catalogInfo"
    //                     //     }
    //                     // },
    //                     // {
    //                     //     "$lookup": {
    //                     //         "from": 'catalogs',
    //                     //         "localField": "storesInfo.featureCatalog",
    //                     //         "foreignField": "_id",
    //                     //         "as": "featureCatalogInfo"
    //                     //     }
    //                     // },
    //                     {
    //                         "$lookup": {
    //                             "from": 'collections',
    //                             "localField": "_id",
    //                             "foreignField": "_id",
    //                             "as": "collectionInfo"
    //                         }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$storesInfo",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$offerInfo",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     // {
    //                     //     $unwind: {
    //                     //         path: "$catalogInfo",
    //                     //         preserveNullAndEmptyArrays: true
    //                     //     }
    //                     // },
    //                     {
    //                         $unwind: {
    //                             path: "$collectionInfo",
    //                             preserveNullAndEmptyArrays: false
    //                         }
    //                     },
    //                     // {
    //                     //     $unwind: {
    //                     //         path: "$featureCatalogInfo",
    //                     //         preserveNullAndEmptyArrays: false
    //                     //     }
    //                     // },
    //                     {
    //                         $group: {
    //                             _id: "$_id",
    //                             collectionName: "$_id",
    //                             collectionName : { $first : "$collectionInfo.collectionName"},
    //                             collectionType : { $first : "$collectionInfo.collectionType"},
    //                             cityName : { $first : "$collectionInfo.cityName"},
    //                             buisnessOnline : { $first : "$collectionInfo.buisnessOnline"},
    //                             buisnessOffline : { $first : "$collectionInfo.buisnessOffline"},
    //                             collectionPicture : { $first : "$collectionInfo.collectionPicture"},
    //                             storesInfo: { $addToSet: '$storesInfo' },
    //                             offerInfo: { $addToSet: '$offerInfo' },
    //                             //     catalogInfo: { $addToSet: '$catalogInfo' },
    //                             //  featureCatalogInfo: { $addToSet: '$featureCatalogInfo' }
    //                         },
    //                     },
    //                     // {
    //                     //     $unwind: {
    //                     //         path: "$collectionInfo",
    //                     //         preserveNullAndEmptyArrays: false
    //                     //     }
    //                     // },
    //                     // {
    //                     //     $project: {
    //                     //         'collectionName': '$collectionInfo.collectionName',
    //                     //         'collectionType': '$collectionInfo.collectionType',
    //                     //         'collectionPicture': '$collectionInfo.collectionPicture',
    //                     //         storesInfo: {
    //                     //             $filter: { input: "$storesInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
    //                     //         },
    //                     //         offerInfo: {
    //                     //             $filter: { input: "$offerInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
    //                     //         },
    //                     //         catalogInfo: {
    //                     //             $filter: { input: "$catalogInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
    //                     //         },
    //                     //         featureCatalogInfo: {
    //                     //             $filter: { input: "$featureCatalogInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
    //                     //         }
    //                     //     },
    //                     // },
    //                     // {
    //                     //     $project: {
    //                     //         collectionName: 1,
    //                     //         collectionType: 1,
    //                     //         collectionPicture: 1,
    //                     //         storesInfo: {
    //                     //             _id: 1,
    //                     //             storeName: 1,
    //                     //             storeLogo: 1,
    //                     //             storeBanner: 1,
    //                     //             avgRating: 1,
    //                     //         },
    //                     //         offerInfo: {
    //                     //             _id: 1,
    //                     //             offerName: 1,
    //                     //             offerPicture: 1,
    //                     //             offerDescription: 1,
    //                     //         },
    //                     //         catalogInfo: {
    //                     //             _id: 1,
    //                     //             catalogUrl: 1,
    //                     //             catalogDescription: 1,
    //                     //         },
    //                     //         featureCatalogInfo: {
    //                     //             _id: 1,
    //                     //             catalogUrl: 1,
    //                     //             catalogDescription: 1,
    //                     //         },
    //                     //     }
    //                     // },
    //                 ]).exec(function (err, results) {
    //                     for (var i = 0; i < results[0].storesInfo.length; i++) {
    //                         if (results[0].storesInfo[i].bookmarkBy == undefined) {
    //                             results[0].storesInfo[i].bookmarkBy = [];
    //                         }
    //                         for (var j = 0; j < results[0].storesInfo[i].bookmarkBy.length; j++) {
    //                             results[0].storesInfo[i].isBookmarked = (results[0].storesInfo[i].bookmarkBy[j]).toString()==(user.id)?true:false;
    //                         }
    //                     }   
    //                     resolve(results[0]);

    //                 })
    //             });
    //         })
    //         .then((results) => {
    //             if (results.storesInfo != undefined) {
    //                 var promises = [];
    //                 for (let i = 0; i < results.storesInfo.length; i++) {
    //                     promises.push(this.getStoreCatalog(i, results.storesInfo[i]._id));
    //                 }
    //             }
    //             return new Promise(function (resolve, reject) {
    //                 Promise.all(promises).then(function (catalogInfo) {
    //                     for (let i = 0; i < catalogInfo.length; i++) {
    //                         results.storesInfo[catalogInfo[i][0]]['catalogInfo'] = catalogInfo[i][1];
    //                     };
    //                     resolve(results);
    //                 });
    //             });
    //         })
    //         .then((collection) => {
    //             callback.onSuccess(collection);
    //         })
    //         .catch((error) => {
    //             callback.onError(error);
    //         });
    // }

    getCollectionBySearch(req, callback) {
        let data = req.body;
        var ObjectID = require('mongodb').ObjectID;
        let query = req.query;
        let mongoQuery = {};
        let skip = 0;
        let limit = 10;
        for (var key in query) {
            if (key == "searchCollection") {
                mongoQuery['$or'] = [
                    { 'collectionName': { $regex: new RegExp(query[key], 'i') } },
                ]
            } else if (key == "location") {
                var re = new RegExp(query[key], 'i');
                mongoQuery['cityName'] = { "$in": [re] };
            } else if (key == "buisnessOnline") {
                mongoQuery['buisnessOnline'] = ('true' === query[key]);
            } else if (key == "buisnessOffline") {
                mongoQuery['buisnessOffline'] = ('true' === query[key]);
            } else if (key == "buisnessBoth") {
                mongoQuery['buisnessBoth'] = ('true' === query[key]);
            } else if (key == "collectionType") {
                mongoQuery['collectionType'] = query[key];
            } else if (key == "startCollections") {
                skip = parseInt(query[key]);
            } else if (key == "endCollections") {
                limit = parseInt(query[key]) - skip + 1;
            }
        }
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                CollectionModel.find(mongoQuery).skip(skip).limit(limit).sort().exec(function (err, results) {
                    resolve(results);
                })
            });
        })
        .then((collections) => {
            callback.onSuccess(collections);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    // getSearchByQuery(req, callback) {
    //     let data = req.body;
    //     var matchQuery = [];
    //     var ObjectID = require('mongodb').ObjectID;
    //     var qString = {};
    //     var i = 0;
    //     var longitude = this.noNaN(parseFloat(req.query.lng));
    //     var lattitude = this.noNaN(parseFloat(req.query.lat));
    //     for (var param in req.query) {
    //         if (param == "buisnessOnline" || param == "buisnessOffline") {
    //             qString = {};
    //             qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
    //             matchQuery.push(qString);
    //         }
    //     }
    //     req.getValidationResult()
    //         .then(function (result) {
    //             if (!result.isEmpty()) {
    //                 let errorMessages = result.array().map(function (elem) {
    //                     return elem.msg;
    //                 });
    //                 throw new ValidationError(errorMessages);
    //             }
    //             return new Promise(function (resolve, reject) {
    //                 CityModel.aggregate([
    //                     {
    //                         "$geoNear": {
    //                             "near": {
    //                                 "type": "Point",
    //                                 "coordinates": [longitude, lattitude]
    //                             },
    //                             "distanceField": "distance",
    //                             "spherical": true,
    //                             "maxDistance": 5000
    //                         }
    //                     },
    //                 ]).exec(function (err, results) {
    //                     resolve(results);
    //                 })
    //             });
    //         }).then((results) => {
    //             var matchCity = [{ cityName: { '$regex': 'emptyarray' } }];
    //             for (var i = 0; i < results.length; i++) {
    //                 qString = {};
    //                 qString['cityName'] = { $regex: results[i]['cityName'] }
    //                 matchCity.push(qString);
    //             }
    //             return new Promise(function (resolve, reject) {
    //                 CollectionModel.aggregate([
    //                     {
    //                         "$match": { $and: [{ $and: matchQuery }, { $or: matchCity }] }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$offerId",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$catalogId",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         "$lookup": {
    //                             "from": 'stores',
    //                             "localField": "storeId",
    //                             "foreignField": "_id",
    //                             "as": "storesInfo"
    //                         }
    //                     },
    //                     {
    //                         "$lookup": {
    //                             "from": 'offers',
    //                             "localField": "offerId",
    //                             "foreignField": "_id",
    //                             "as": "offerInfo"
    //                         }
    //                     },
    //                     {
    //                         "$lookup": {
    //                             "from": 'catalogs',
    //                             "localField": "catalogId",
    //                             "foreignField": "_id",
    //                             "as": "catalogInfo"
    //                         }
    //                     },
    //                     {
    //                         "$lookup": {
    //                             "from": 'catalogs',
    //                             "localField": "storesInfo.featureCatalog",
    //                             "foreignField": "_id",
    //                             "as": "featureCatalogInfo"
    //                         }
    //                     },
    //                     {
    //                         $project: {
    //                             collectionName: 1,
    //                             collectionType: 1,
    //                             collectionPicture: 1,
    //                             cityName: 1,
    //                             storesInfo: {
    //                                 _id: 1,
    //                                 storeName: 1,
    //                                 storeLogo: 1,
    //                                 storeBanner: 1,
    //                                 avgRating: 1,
    //                             },
    //                             offerInfo: {
    //                                 _id: 1,
    //                                 offerName: 1,
    //                                 offerPicture: 1,
    //                                 offerDescription: 1,
    //                             },
    //                             catalogInfo: {
    //                                 _id: 1,
    //                                 catalogUrl: 1,
    //                                 catalogDescription: 1,
    //                             },
    //                             featureCatalogInfo: {
    //                                 _id: 1,
    //                                 catalogUrl: 1,
    //                                 catalogDescription: 1,
    //                             },
    //                         }
    //                     },
    //                 ]).exec(function (err, results) {
    //                     resolve(results);
    //                 })
    //             });
    //         })
    //         .then((collection) => {
    //             callback.onSuccess(collection);
    //         })
    //         .catch((error) => {
    //             callback.onError(error);
    //         });
    // }

    getLatestCollections(req, callback) {
        let data = req.body;
        // req.checkQuery('lng', 'Invalid urlparam').notEmpty()
        // req.checkQuery('lat', 'Invalid urlparam').notEmpty()
        var matchQuery = [];
        var ObjectID = require('mongodb').ObjectID;
        var qString = {};
        var i = 0;

        for (var param in req.query) {
            if (param !== "cityName") {
                qString = {};
                qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
                matchQuery.push(qString);
            }
            if (param == "cityName") {
                qString[param] = { $regex: req.query[param][i] }
                matchQuery.push(qString);
                i++;
            }
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
                    CollectionModel.aggregate([
                        // {
                        //     "$geoNear": {
                        //         "near": {
                        //             "type": "Point",
                        //             "coordinates": [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                        //         },
                        //         "distanceField": "distance",
                        //         "spherical": true,
                        //         "maxDistance": 0
                        //     }
                        // },
                        // {
                        //     $unwind: {
                        //         path: "$cityName",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
                        // {
                        //     "$match" : { $and : matchQuery }
                        // },
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
                                "from": 'catalogs',
                                "localField": "storesInfo.featureCatalog",
                                "foreignField": "_id",
                                "as": "featureCatalogInfo"
                            }
                        },
                        {
                            $project: {
                                collectionName: 1,
                                collectionType: 1,
                                collectionPicture: 1,
                                dateCreated: 1,
                                storesInfo: {
                                    _id: 1,
                                    storeName: 1,
                                    storeLogo: 1,
                                    storeBanner: 1,
                                    avgRating: 1,
                                },
                                offerInfo: {
                                    _id: 1,
                                    offerName: 1,
                                    offerPicture: 1,
                                    offerDescription: 1,
                                },
                                catalogInfo: {
                                    _id: 1,
                                    catalogUrl: 1,
                                    catalogDescription: 1,
                                },
                                featureCatalogInfo: {
                                    _id: 1,
                                    catalogUrl: 1,
                                    catalogDescription: 1,
                                },
                            }
                        },
                        { '$sort': { 'dateCreated': -1 } },
                        { $limit: 10 },
                    ]).exec(function (err, results) {
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
        new Promise(function (resolve, reject) {
            CollectionModel.find({}, function (err, collections) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(collections);
                }
            }).exec(function (err, results) {
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
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }

    noNaN(n) { return isNaN(n) ? 0 : n; }
}

module.exports = CollectionHandler;
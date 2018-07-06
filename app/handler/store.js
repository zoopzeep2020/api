/**
 * Created by WebrexStudio on 5/13/17.
 */
var apn = require('apn');
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
const subscribeTopic = require(APP_HANDLER_PATH + 'pushNotification').subscribeTopic;
const unSubscribeTopic = require(APP_HANDLER_PATH + 'pushNotification').unSubscribeTopic;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const BookmarkModel = require(APP_MODEL_PATH + 'bookmark').BookmarkModel;
const MylistModel = require(APP_MODEL_PATH + 'mylist').MylistModel;
const CategoryModel = require(APP_MODEL_PATH + 'category').CategoryModel;
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const CityModel = require(APP_MODEL_PATH + 'city').CityModel;
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const mongoose = require('mongoose');
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const KeywordModel = require(APP_MODEL_PATH + 'keyword').KeywordModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');
var path = require('path');
var request = require('request');
var ObjectId = require('mongodb').ObjectID;
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class StoreHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get STORE_VALIDATION_SCHEME() {
        return {
            'storeName': {
                isLength: {
                    options: [{ min: 2 }],
                    errorMessage: 'storeName must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'storeName is required'
            },
        }
    }

    createNewStore(req, callback) {
        let data = req.body;
        let validator = this._validator;
        // var longitude = this.noNaN(parseFloat(req.body.location[0]));
        // var lattitude = this.noNaN(parseFloat(req.body.location[1]));        
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new StoreModel({});
            })
            .then((store) => {
                store.viewCount = 1
                store.avgRating = 0
                store.reviewCount = 0
                store.bookmarkCount = 0
                store.save();
                return store;
                //     return new Promise(function(resolve, reject) {
                //         CityModel.aggregate(
                //             {
                //                 "$geoNear": {
                //                     "near": {
                //                         "type": "Point",
                //                         "coordinates": [longitude, lattitude]
                //                     },
                //                     "distanceField": "distance",
                //                     "spherical": true,
                //                     "maxDistance": 0
                //                 }
                //             },
                //             {$sort:{maxDistance:-1}},
                //             {$limit:1},
                //         function(err, city) {
                //             if (err !== null) {
                //                 reject(err);
                //             } else {
                //                 store.storeCity = city[0]['cityName']
                //                 store.save();
                //                 resolve(store);
                //             }
                //         })
                //     });
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteStore(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid store id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    StoreModel.findOne({ storeId: req.params.id }, function (err, store) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!store) {
                                reject(new NotFoundError("Store not found"));
                            } else {
                                resolve(store);
                            }
                        }
                    })
                });
            })
            .then((store) => {
                store.remove();
                return store;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateStore(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        let data = req.body;
        async.waterfall([
            function (done, err) {
                if (files != undefined && typeof files['storeLogo'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['storeLogo'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['storeLogo'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.storeLogo = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    done(err, data);
                }
            },
            function (data, done, err) {
                if (files != undefined && typeof files['storeBanner'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['storeBanner'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['storeBanner'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.storeBanner = targetDir + fileName;
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
                if (req.body.storeName != undefined) {
                    req.checkBody('storeName', 'category is required').notEmpty();
                }
                if (req.body.storeLogo != undefined) {
                    req.checkBody('storeLogo', 'storeLogo is required').isImage(req.body.storeLogo);
                }
                if (req.body.categoriesIds != undefined) {
                    req.checkBody('categoriesIds', 'minimum one categoriesIds is required').notEmpty();
                }
                if (req.body.keyword != undefined) {
                    req.checkBody('keyword', 'minimum one keyword is required').notEmpty();
                }
                if (req.body.storeBanner != undefined) {
                    req.checkBody('storeBanner', 'storeBanner is required').isImage(req.body.storeBanner);
                }
                if (req.body.buisnessBoth && req.body.buisnessOnline && req.body.buisnessOffline) {
                    req.checkBody('buisnessBoth', 'only one of buisnessBoth, buisnessOnline and buisnessOffline should be true').isBoolean();
                }
                if (req.body.address != undefined) {
                    req.checkBody('address', 'address must not be empty').notEmpty();
                }
                if (req.body.storePhone != undefined) {
                    req.checkBody('storePhone', 'storePhone must not be empty').notEmpty();
                }
                if (req.body.storeDiscription != undefined) {
                    req.checkBody('storeDiscription', 'storeDiscription must not be empty').notEmpty();
                }
                if (req.body.keyword != undefined) {
                    req.checkBody('keyword', 'keyword must not be empty').notEmpty();
                }
                if (req.body.otherKeyword != undefined) {
                    req.checkBody('otherKeyword', 'otherKeyword must not be empty').notEmpty();
                }
                if (req.body.webAddress != undefined) {
                    req.checkBody('webAddress', 'webAddress must not be empty').notEmpty();
                }
                if (req.body.countries != undefined) {
                    req.checkBody('countries', 'countries must not be empty').notEmpty();
                }
                if (req.body.dispatchDayMin != undefined) {
                    req.checkBody('dispatchDayMin', 'dispatchDayMin must not be empty').notEmpty();
                }
                if (req.body.dispatchDayMax != undefined) {
                    req.checkBody('dispatchDayMax', 'dispatchDayMax must not be empty').notEmpty();
                }
                if (req.body.customization != undefined) {
                    req.checkBody('customization', 'customization must be true or false').isBoolean();
                }
                if (req.body.giftWrap != undefined) {
                    req.checkBody('giftWrap', 'giftWrap must be true or false').isBoolean();
                }
                if (req.body.cod != undefined) {
                    req.checkBody('cod', 'cod must be true or false').isBoolean();
                }
                if (req.body.freeShiping != undefined) {
                    req.checkBody('freeShiping', 'freeShiping must be true or false').isBoolean();
                }
                if (req.body.returnandreplace != undefined) {
                    req.checkBody('returnandreplace', 'returnandreplace must not be empty').notEmpty();
                }
                if (req.body.isActive != undefined) {
                    req.checkBody('isActive', 'isActive must be true or false').isBoolean();
                }
                req.getValidationResult()
                    .then(function (result) {
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages.join(' && ')); ValidationError(errorMessages);
                        }
                        return new Promise(function (resolve, reject) {
                            StoreModel.findOne({ _id: req.params.id }, function (err, store) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!store) {
                                        reject(new NotFoundError("store not found"));
                                    } else {
                                        resolve(store);
                                    }
                                }
                            })
                        });
                    })
                    .then((store) => {
                        if (req.body.location != undefined) {
                            var longitude = isNaN(parseFloat(req.body.location[0])) ? 0 : parseFloat(req.body.location[0]);
                            var lattitude = isNaN(parseFloat(req.body.location[1])) ? 0 : parseFloat(req.body.location[1]);
                            return new Promise(function (resolve, reject) {
                                CityModel.aggregate(
                                    {
                                        "$geoNear": {
                                            "near": {
                                                "type": "Point",
                                                "coordinates": [longitude, lattitude]
                                            },
                                            "distanceField": "distance",
                                            "spherical": true,
                                            "maxDistance": 0
                                        }
                                    },
                                    { $sort: { maxDistance: -1 } },
                                    { $limit: 1 },
                                    function (err, city) {
                                        if (err !== null) {
                                            reject(err);
                                        } else {
                                            store.storeCity = city[0]['cityName']
                                            store.save();
                                            resolve(store);
                                        }
                                    })
                            });
                        } else {
                            return store;
                        }
                    })
                    .then((store) => {
                        for (var key in data) {
                            store[key] = data[key];
                        }
                        store.save();
                        return store;
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

    getStoreOffer(i, storeId) {
        return new Promise(function (resolve, reject) {
            OfferModel.find({ storeId: storeId }).limit(1).sort({ dateCreated: -1 }).exec(function (err, offer) {
                return resolve([i, offer]);
            })
        });
    }

    getStoreReview(i, storeId) {
        return new Promise(function (resolve, reject) {
            ReviewModel.find({ storeId: storeId }).limit(1).sort({ dateCreated: -1 }).exec(function (err, review) {
                return resolve([i, review]);
            })
        });
    }

    getStoreCatalogue(i, storeId) {
        return new Promise(function (resolve, reject) {
            CatalogModel.find({ storeId: storeId }).exec(function (err, catalog) {
                return resolve([i, catalog]);
            })
        });
    }

    getSingleStore(user, req, callback) {
        let data = req.body;
        let query = {};
        if (!(user.storeId === req.params.id)) {
            query['$inc'] = { viewCount: 1 }
        }
        req.checkParams('id', 'Invalid store id provided').isMongoId();
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                StoreModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), query, { 'new': true, 'multi': true }).populate({ path: 'categoriesIds' }).populate({ path: 'featureCatalog' }).populate({ path: 'keyword' }).populate({ path: 'storeCityID' }).lean().exec(function (err, store) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!store) {
                            reject(new NotFoundError("store not found"));
                        } else {
                            // check store is bookmarked by user or not
                            store.is_bookmarked_by_me = false;
                            if (store.bookmarkBy == undefined) {
                                store.bookmarkBy = [];
                            }

                            store.bookmarkCount = store.bookmarkBy.length;
                            for (var i = 0; i < store.bookmarkBy.length; i++) {
                                if (store.bookmarkBy[i] == user.id) {
                                    store.is_bookmarked_by_me = true;
                                    break;
                                }
                            }
                            // convert avgRating to 1 decimal point
                            store.avgRating = ((store.avgRating * 10) - ((store.avgRating * 10) % 1)) / 10
                            resolve(store);
                        }
                    }
                })
            });
        }).then((store) => {
            var storePromise = new Promise(function (resolve, reject) {
                ReviewModel.findOne({ storeId: req.params.id, userId: user.id }).populate({ path: 'userId' }).sort({ 'dateCreated': -1 }).limit(1).lean().exec(function (err, review) {
                    if (err !== null) {
                        resolve(store);
                    } else {
                        if (!review) {
                            store.is_rated_by_me = false;
                            store.rate_given_by_me = null;
                            store.userReview = null;
                            resolve(store);
                        } else {
                            store.is_rated_by_me = true;
                            store.rate_given_by_me = review.ratingScale;
                            store.userReview = review;
                            resolve(store);
                        }
                    }
                })
            });
            var myListPromise = new Promise(function (resolve, reject) {
                MylistModel.find({ stores: { $in: [req.params.id] }, userId: user.id }).sort({ 'dateCreated': -1 }).limit(1).lean().exec(function (err, mylist) {
                    if (err !== null) {
                        resolve(store);
                    } else {
                        if (mylist.length == 0) {
                            store.is_added_to_my_list = false;
                            store.mylist = [];
                            resolve(store);
                        } else {
                            store.is_added_to_my_list = true;
                            store.mylist = mylist;
                            resolve(store);
                        }
                    }
                })
            });
            var offerPromise = new Promise(function (resolve, reject) {
                OfferModel.find({ storeId: req.params.id }).sort({ 'dateCreated': -1 }).limit(3).lean().exec(function (err, offer) {
                    if (err !== null) {
                        resolve(store);
                    } else {
                        if (!offer) {
                            store.storeOffers = [];
                            resolve(store);
                        } else {
                            store.storeOffers = offer;
                            resolve(store);
                        }
                    }
                })
            });
            var reviewPromise = new Promise(function (resolve, reject) {
                ReviewModel.find({ storeId: req.params.id }).sort({ 'dateCreated': -1 }).populate({ path: 'userId' }).limit(3).lean().exec(function (err, review) {
                    if (err !== null) {
                        resolve(store);
                    } else {
                        if (!review) {
                            store.reviews = [];
                            resolve(store);
                        } else {
                            store.reviews = review;
                            resolve(store);
                        }
                    }
                })
            });
            var catalogPromise = new Promise(function (resolve, reject) {
                CatalogModel.find({ storeId: req.params.id }).sort({ 'dateCreated': -1 }).lean().exec(function (err, catalogs) {
                    if (err !== null) {
                        resolve(store);
                    } else {
                        if (!catalogs) {
                            store.storeCatalogs = [];
                            resolve(store);
                        } else {
                            store.storeCatalogs = catalogs;
                            resolve(store);
                        }
                    }
                })
            });
            return new Promise(function (resolve, reject) {
                Promise.all([storePromise, myListPromise, offerPromise, reviewPromise, catalogPromise]).then(function (results) {
                    // if (results[0]['storeOffers'][0] != undefined) {
                    //     results[0]['storeOffers'][0].isClaimedByMe = false;
                    //     for (var i = 0; i <= results[0]['storeOffers'][0]['claimedOfferBy'].length; i++) {
                    //         if (user.id == results[0]['storeOffers'][0]['claimedOfferBy'][i]) {
                    //             results[0]['storeOffers'][0].isClaimedByMe = true
                    //         }
                    //     }
                    // }
                    resolve(results[0]);

                });
            });
        }).then((store) => {
            store.featureCatalog = [store.featureCatalog];
            callback.onSuccess([store]);
        })
            .catch((error) => {
                callback.onError(error);
            });
    }

    bookmarkStore(user, req, callback) {
        let data = req.body;
        let ModelData = {}
        var bookmark = req.body.bookmark;
        let query = {};
        if (bookmark) {
            query['$addToSet'] = { bookmarkBy: mongoose.Types.ObjectId(user.id) }
        } else {
            query['$pull'] = { bookmarkBy: mongoose.Types.ObjectId(user.id) }
        }

        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                StoreModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.storeId), query, { 'new': true, 'multi': true }).select("bookmarkBy").lean().exec(function (err, store) {
                    if (err !== null) {
                        reject(new NotFoundError("store not found"))
                    } else {
                        if (!store) {
                            reject(new NotFoundError("store not found"))
                        } else {
                            store.bookmarkCount = store.bookmarkBy.length;
                            store.is_bookmarked_by_me = bookmark;
                            resolve(store);
                        }
                    }
                })
            });
        }).then((store) => {
            UserModel.aggregate({ "$match": { "storeId": store._id } }, function (err, user) {
                if (err !== null) {
                    return err;
                } else {
                    if (!user) {
                        return new NotFoundError("Offer not found");
                    } else {
                        if (bookmark) {
                            ModelData['storeId'] = user[0].storeID
                            ModelData['title'] = 'title'
                            ModelData['deviceToken'] = user[0].deviceToken
                            ModelData['deviceType'] = user[0].deviceType
                            ModelData['notificationType'] = 'bookmark'
                            ModelData['description'] = user[0].name + ' has bookmarked your store';
                            StoreNotificationModel(ModelData).save();
                            if (ModelData['deviceToken']) {
                                if (ModelData['deviceType'] == 'Android') {
                                    sendAndroidNotification(ModelData)
                                } else if (ModelData['deviceType'] == 'IOS') {
                                    sendAppleNotification(ModelData)
                                }
                            }
                            subscribeTopic(user[0].deviceToken, store._id)
                        } else if (!bookmark) {
                            unSubscribeTopic(user[0].deviceToken, store._id)
                        }
                    }
                }
            })
            return store;
        }).then((store) => {
            callback.onSuccess(store);
        }).catch((error) => {
            callback.onError(error);
        });
    }

    getTrendingStore(req, callback) {
        let data = req.body;
        var matchQuery = [{ "isActive": 1 == 1 }];
        var max = this.getMaxViewCount().viewCount;
        var ObjectID = require('mongodb').ObjectID;
        var longitude = this.noNaN(parseFloat(req.query.lng));
        var lattitude = this.noNaN(parseFloat(req.query.lat));
        var qString = {};
        for (var param in req.query) {
            if ((param !== "lng" && param !== "lat") && (param == "buisnessOnline" || param == "buisnessOffline")) {
                qString = {};
                qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
                matchQuery.push(qString);
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
                new Promise(function (resolve, reject) {
                    if (req.query.buisnessOffline == "true") {
                        StoreModel.aggregate([
                            // {
                            //     "$geoNear": {
                            //         "near": {
                            //             "type": "Point",
                            //             "coordinates": [longitude, lattitude]
                            //         },
                            //         "distanceField": "distance",
                            //         "spherical": true,
                            //         "maxDistance": 0
                            //     }
                            // },
                            // {
                            //     "$match": { "isActive": 1 == 1 }
                            // },
                            {
                                "$match": { $and: matchQuery }
                            },
                            {
                                $project: {
                                    finalTotal: {
                                        $let: {
                                            vars: {
                                                total: { $divide: [{ $multiply: ['$viewCount', 5] }, { $max: "$viewCount" }] },
                                            },
                                            in: { $add: ["$avgRating", "$$total"] }
                                        }
                                    },
                                    avgRating: { $divide: [{ $subtract: [{ $multiply: ['$avgRating', 10] }, { $mod: [{ $multiply: ["$avgRating", 10] }, 1] },] }, 10] },

                                }
                            },
                            {
                                "$lookup": {
                                    "from": 'stores',
                                    "localField": "_id",
                                    "foreignField": "_id",
                                    "as": "storesInfo"
                                }
                            },
                            {
                                $project: {
                                    storeName: '$storesInfo.storeName',
                                    avgRating: '$avgRating',
                                    // avgRating: { $divide: [{ $subtract: [{ $multiply: ['$avgRating', 10] }, { $mod: [{ $multiply: ["$avgRating", 10] }, 1] },] }, 10] },
                                    storeBanner: '$storesInfo.storeBanner',
                                    storeDiscription: '$storesInfo.storeDiscription',
                                    storeLogo: '$storesInfo.storeLogo',
                                    keywords: '$storesInfo.keywords',
                                    featureCatalog: '$storesInfo.featureCatalog',
                                    finalTotal: '$finalTotal',
                                    distance: '$distance',
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeName",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$avgRating",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeBanner",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeDiscription",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeLogo",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$featureCatalog",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                "$lookup": {
                                    "from": 'catalogs',
                                    "localField": "featureCatalog",
                                    "foreignField": "_id",
                                    "as": "featureCatalogInfo"
                                }
                            },
                            { $sort: { finalTotal: -1 } },
                            { $limit: 10 },
                        ]).exec(function (err, results) {
                            resolve(results);
                        }).then((results) => {
                            callback.onSuccess(results);
                        })
                    } else {
                        StoreModel.aggregate([
                            {
                                "$match": { "isActive": 1 == 1 }
                            },
                            {
                                "$match": { $and: matchQuery }
                            },
                            {
                                $project: {
                                    finalTotal: {
                                        $let: {
                                            vars: {
                                                total: { $divide: [{ $multiply: ['$viewCount', 5] }, { $max: "$viewCount" }] },
                                            },
                                            in: { $add: ["$avgRating", "$$total"] }
                                        }
                                    },
                                    avgRating: { $divide: [{ $subtract: [{ $multiply: ['$avgRating', 10] }, { $mod: [{ $multiply: ["$avgRating", 10] }, 1] },] }, 10] },

                                }
                            },
                            {
                                "$lookup": {
                                    "from": 'stores',
                                    "localField": "_id",
                                    "foreignField": "_id",
                                    "as": "storesInfo"
                                }
                            },
                            {
                                $project: {
                                    storeName: '$storesInfo.storeName',
                                    avgRating: '$avgRating',
                                    // avgRating: { $divide: [{ $subtract: [{ $multiply: ['$storesInfo.avgRating', 10] }, { $mod: [{ $multiply: ["$storesInfo.avgRating", 10] }, 1] },] }, 10] },
                                    storeBanner: '$storesInfo.storeBanner',
                                    storeDiscription: '$storesInfo.storeDiscription',
                                    storeLogo: '$storesInfo.storeLogo',
                                    keywords: '$storesInfo.keywords',
                                    featureCatalog: '$storesInfo.featureCatalog',
                                    finalTotal: '$finalTotal',
                                    distance: '$distance',
                                }
                            },

                            {
                                $unwind: {
                                    path: "$storeName",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$avgRating",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeBanner",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeDiscription",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$storeLogo",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$featureCatalog",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                "$lookup": {
                                    "from": 'catalogs',
                                    "localField": "featureCatalog",
                                    "foreignField": "_id",
                                    "as": "featureCatalogInfo"
                                }
                            },
                            { $sort: { finalTotal: -1 } },
                            { $limit: 10 },
                        ]).exec(function (err, results) {
                            resolve(results);
                        }).then((results) => {
                            callback.onSuccess(results);
                        })
                    }
                });
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getStoreCatalog(i, storeId) {
        return new Promise(function (resolve, reject) {
            CatalogModel.find({ storeId: storeId }).limit(3).exec(function (err, catalog) {
                return resolve([i, catalog]);
            })
        });
    }

    getMaxViewCount(i, storeId) {
        return new Promise(function (resolve, reject) {
            StoreModel.findOne({}).select('viewCount').sort({ viewCount: -1 }).limit(1).exec(function (err, store) {
                return resolve([i, store]);
            })
        });
    }

    rendom(user, req, callback) {
        let data = req.body;
        if (!data.resultStoreId) {
            data.resultStoreId = [];
        }

        let storesId = [];
        data.resultStoreId.forEach(function (store) {
            storesId.push(mongoose.Types.ObjectId(store));
        });
        new Promise(function (resolve, reject) {
            StoreModel.aggregate([
                {
                    "$match": { "_id": { "$nin": storesId }, "isActive": true }
                },
                { $sample: { size: 10 } }
            ]).exec(function (err, store) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!store) {
                        reject(new NotFoundError("store not found"));
                    } else {
                        resolve(store);
                    }
                }
            })
        }).then((stores) => {
            let result = {};
            stores.forEach(function (store) {
                data.resultStoreId.push(store._id);
            });

            result.stores = stores
            result.resultStoreId = data.resultStoreId;

            callback.onSuccess(result);
        })
            .catch((error) => {
                callback.onError(error);
            });
    }



    getStoreBySearch(user, req, callback) {
        let data = req.body;
        var ObjectID = require('mongodb').ObjectID;
        let query = req.query;
        let mongoQuery = { isActive: true };
        let mainObj = [];
        var storeIds = [];
        let skip = 0;
        let limit = 0;
        var maxviewcount = 1;
        var trendingResult = 0;
        var arrayFinal = [];
        for (var key in query) {
            if (key == "search") {
                mongoQuery['$text'] = {
                    '$search': query[key]
                }

            } else
                if (key == "location") {
                    var re = new RegExp(query[key], 'i');
                    mongoQuery['storeCity'] = { "$in": [re] };
                } else if (key == "active") {
                    mongoQuery['isActive'] = ('true' === query[key]);
                } else if (key == "category") {
                    mongoQuery['categoriesIds'] = { "$in": [query[key]] };
                } else if (key == "buisnessOnline") {
                    mongoQuery['buisnessOnline'] = ('true' === query[key]);
                } else if (key == "buisnessOffline") {
                    mongoQuery['buisnessOffline'] = ('true' === query[key]);
                } else if (key == "buisnessBoth") {
                    mongoQuery['buisnessBoth'] = ('true' === query[key]);
                } else if (key == "keyword") {
                    mongoQuery['keyword'] = { "$in": [query[key]] };
                } else if (key == "otherKeyword") {
                    mongoQuery['otherKeyword'] = { "$in": [query[key]] };
                } else if (key == "startStores") {
                    skip = parseInt(query[key]);
                } else if (key == "endStores") {
                    limit = parseInt(query[key]) - skip + 1;
                } else if (key == "trendingResult") {
                    trendingResult = parseInt(req.query.trendingResult)
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
                    if (req.query.search) {
                        StoreModel.find(mongoQuery, { score: { $meta: "textScore" } }).populate({ path: 'featureCatalog' }).sort({ score: { $meta: "textScore" } }).skip(skip).limit(limit).lean().exec(function (err, results) {
                            resolve(results);
                        })
                    } else {
                        StoreModel.find(mongoQuery).sort({ dateCreated: 1 }).skip(skip).limit(limit).populate({ path: 'featureCatalog' }).lean().exec(function (err, results) {
                            resolve(results);
                        })
                    }
                });
            }).then((results) => {
                if (req.query.trending == 'true') {
                    return new Promise(function (resolve, reject) {
                        StoreModel.findOne({ isActive: true }).select('viewCount').sort({ viewCount: -1 }).limit(1).exec(function (err, store) {
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
                            mainObj[i] = results[items[i][1]]
                        }
                        return mainObj;
                    })
                } else {
                    return results;
                }
            }).then((results) => {
                return new Promise(function (resolve, reject) {
                    for (var i = 0; i < results.length; i++) {
                        results[i].avgRating = ((results[i].avgRating * 10) - ((results[i].avgRating * 10) % 1)) / 10

                        if (results[i].bookmarkBy == undefined) {
                            results[i].bookmarkBy = [];
                            results[i].is_bookmarked_by_me = false
                        }

                        for (var j = 0; j < results[i].bookmarkBy.length; j++) {
                            if ((results[i].bookmarkBy[j]).toString() == (user.id)) {
                                results[i].is_bookmarked_by_me = true;
                                break;
                            } else {
                                results[i].is_bookmarked_by_me = false;
                            }
                        }
                    }
                    resolve(results)
                })
            }).then((results) => {
                if (query['search'] || query['category']) {
                    if (results != undefined) {
                        var promises = [];
                        for (var i = 0; i < results.length; i++) {
                            promises.push(this.getStoreCatalog(i, results[i]._id));
                        }
                    }
                    return new Promise(function (resolve, reject) {
                        Promise.all(promises).then(function (catalogInfo) {
                            for (let i = 0; i < catalogInfo.length; i++) {
                                results[catalogInfo[i][0]]['catalogInfo'] = catalogInfo[i][1];
                            };
                            resolve(results);
                        });
                    });
                } else {
                    return results;
                }
            }).then((results) => {
                callback.onSuccess(results);

            }).catch((error) => {
                callback.onError(error);
            });
    }

    getAllStores(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            StoreModel.find({}).populate({ path: 'categoriesIds', select: ['category', 'categoryImage', 'categoryActiveImage'] }).exec(function (err, store) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(store);
                }
            });
        }).then((store) => {
            callback.onSuccess(store);
        })
            .catch((error) => {
                callback.onError(error);
            });
    }

    bookmarkByUser(user, req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            StoreModel.find({ bookmarkBy: { "$in": [user.id] } }).populate({ path: 'categoriesIds', select: ['category', 'categoryImage', 'categoryActiveImage'] }).lean().exec(function (err, store) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(store);
                }
            });
        }).then((results) => {
            if (results != undefined) {
                var promises = [];
                for (var i = 0; i < results.length; i++) {
                    promises.push(this.getStoreCatalog(i, results[i]._id));
                }
            }
            return new Promise(function (resolve, reject) {
                Promise.all(promises).then(function (catalogInfo) {
                    for (let i = 0; i < catalogInfo.length; i++) {
                        results[catalogInfo[i][0]]['catalogInfo'] = catalogInfo[i][1];
                    };
                    resolve(results);
                });
            });
        }).then((store) => {
            for (var i = 0; i < store.length; i++) {
                store[i].is_bookmarked_by_me = true;
            }
            callback.onSuccess(store);
        })
            .catch((error) => {
                callback.onError(error);
            });
    }

    objectify(array) {
        if (array !== undefined) {
            return array.reduce(function (p, c) {
                p[c['fieldname']] = c;
                return p;
            }, {});
        }
    }

    noNaN(n) { return isNaN(n) ? 0 : n; }
}
module.exports = StoreHandler;
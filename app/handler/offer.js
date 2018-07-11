
/**
 * Created by WebrexStudio on 5/9/17.
 */
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
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
const url = require('url');
var request = require('request');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class OfferHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    createNewOffer(req, callback) {
        let ModelData = {};
        req.body.startDate = this.getDDMMMYYYY(req.body.startDate)
        req.body.endDate = this.getDDMMMYYYY(req.body.endDate)
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['offerPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['offerPicture'].originalname.trim().replace(/[^\w\.]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['offerPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.offerPicture = targetDir + fileName;
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
                if (req.body.offerPicture != undefined) {
                    req.checkBody('offerPicture', 'offerPicture is required').isImage(req.body.offerPicture);
                } else {
                    req.checkBody('offerPicture', 'offerPicture is required').notEmpty();
                }
                var discountTypePercentage;
                var discountTypeFlat;
                if (req.body.discountTypePercentage == 'false' || req.body.discountTypePercentage == '0') {
                    discountTypePercentage = (1 == 0);
                } else {
                    discountTypePercentage = Boolean(req.body.discountTypePercentage)
                }

                if (req.body.discountTypeFlat == 'false' || req.body.discountTypeFlat == '0') {
                    discountTypeFlat = (1 == 0);
                } else {
                    discountTypeFlat = Boolean(req.body.discountTypeFlat)
                }
                req.checkBody('offerOnline', 'Either offerOnline is true or offerOffline is true').isOneOfTwoTrue(req.body.offerOnline, req.body.offerOffline);
                req.checkBody('offerOffline', 'Either offerOffline is true or offerOnline is true').isOneOfTwoTrue(req.body.offerOnline, req.body.offerOffline);

                req.checkBody('discountTypePercentage', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(discountTypePercentage, discountTypeFlat);
                req.checkBody('discountTypeFlat', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(discountTypePercentage, discountTypeFlat);
                if (discountTypePercentage) {
                    req.checkBody('percentageDiscount', 'Percentage should be between 1 to 100').checkNumberRange(req.body.percentageDiscount, 1, 100);
                }
                if (discountTypeFlat) {
                    req.checkBody('flatDiscount', 'flatDiscount11 should be number').isInt();
                }
                req.checkBody('offerCode', 'offerCode is required').notEmpty();
                req.checkBody('startDate', 'startDate must be in future and less than endDate').checkDateValidity(req.body.startDate, req.body.endDate);
                req.checkBody('endDate', 'endDate must be in future and greater than startDate').checkDateValidity(req.body.startDate, req.body.endDate);
                req.checkBody('startDate', 'startDate must be in format of mm/dd/yyyy').isDate();
                req.checkBody('endDate', 'endDate must be in format of mm/dd/yyyy').isDate();
                req.getValidationResult()
                    .then(function (result) {
                        var errorMessages = {};
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages);
                        }
                        return new OfferModel(data);
                    }).then((offer) => {
                        return new Promise(function (resolve, reject) {
                            StoreModel.findOne({ _id: offer.storeId }, function (err, store) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!store) {
                                        reject(new NotFoundError("store not found"));
                                    } else {
                                        offer.storeCity = store.storeCity;
                                        offer.isActive = store.isActive;
                                        resolve(offer);
                                    }
                                }
                            })
                        });
                    })
                    .then((offer) => {
                        offer.save();
                        var savedOffer = Object.assign({}, offer._doc);
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                        var new_date = new Date(offer.startDate);
                        savedOffer.startDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                        new_date = new Date(offer.endDate);
                        savedOffer.endDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                        return savedOffer;
                    }).then((offer) => {
                        // ModelData['storeId'] = offer.storeId
                        // ModelData['title'] = 'title'
                        // ModelData['deviceToken'] = "topic"
                        // ModelData['deviceType'] = user[0].deviceType
                        // ModelData['notificationType'] = 'bookmark'
                        // ModelData['description'] = user[0].name + ' has bookmarked your store';
                        // StoreNotificationModel(ModelData).save();
                        // if (ModelData['deviceToken']) {
                        //     if (ModelData['deviceType'] == 'Android') {
                        //         sendAndroidNotification(ModelData)
                        //     } else if (ModelData['deviceType'] == 'IOS') {
                        //         console.log("IOS");
                        //         sendAppleNotification(ModelData)
                        //     }
                        // }
                        StoreModel.aggregate(
                            { "$match": { "_id": offer.storeId } },
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
                                                        var androidTokens = [];
                                                        var appleTokens = [];
                                                        for (var j = 0; j < users.length; j++) {
                                                            if (users[j]['deviceToken']) {
                                                                if (users[j]['deviceType'] == 'Android') {
                                                                    androidTokens.push(users[j].deviceToken);
                                                                } else if (users[j]['deviceType'] == 'IOS') {
                                                                    appleTokens.push(users[j].deviceToken);
                                                                }
                                                            }
                                                        }
                                                        console.log(store[0]);
                                                        ModelData['logo'] = store[0].storeLogo;
                                                        ModelData['storeId'] = store[0]._id;
                                                        ModelData['title'] = 'title';
                                                        ModelData['notificationType'] = 'offer';
                                                        ModelData['description'] = store[0].storeName + ' has created offer';
                                                        StoreNotificationModel(ModelData).save();
                                                        if (androidTokens.length > 0) {
                                                            ModelData['deviceToken'] = "topic";
                                                            ModelData['deviceType'] = "Android";
                                                            sendAndroidNotification(ModelData);
                                                        }
                                                        if (appleTokens.length > 0) {
                                                            ModelData['deviceToken'] = appleTokens;
                                                            ModelData['deviceType'] = "IOS";
                                                            sendAppleNotification(ModelData);
                                                        }
                                                    }
                                                }
                                            })
                                    }
                                }
                            })
                        return offer;
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

    getOfferBySearch(req, callback) {
        let data = req.body;
        let query = req.query;
        let stores = [];
        let mongoQuery = { isActive: true };
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
                        if (key == "offerSearch") {
                            mongoQuery['$or'] = [
                                { 'offerName': { $regex: new RegExp(query[key], 'i') } },
                                { 'offerDescription': { $regex: new RegExp(query[key], 'i') } }
                            ]
                        } else if (key == "storeCity") {
                            var re = new RegExp(query[key], 'i');
                            mongoQuery['storeCity'] = { "$in": [re] };
                        }
                        else if (key == "startOffers") {
                            skip = parseInt(query[key]);
                        } else if (key == "endOffers") {
                            limit = parseInt(query[key]) - skip + 1;
                        }
                    }
                    OfferModel.find(mongoQuery).skip(skip).limit(limit).lean().exec(function (err, Offers) {
                        resolve(Offers);
                    })
                }).then((Offers) => {
                    for (var i = 0; i < Offers.length; i++) {
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                        var new_date = new Date(Offers[i].startDate);
                        Offers[i].startDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                        new_date = new Date(Offers[i].endDate);
                        Offers[i].endDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                    }
                    callback.onSuccess(Offers);
                })
                    .catch((error) => {
                        callback.onError(error);
                    });
            })
    }

    deleteOffer(req, callback) {
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
                    OfferModel.findOne({ _id: req.params.id }, function (err, offer) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!offer) {
                                reject(new NotFoundError("offer not found"));
                            } else {
                                resolve(offer);
                            }
                        }
                    })
                });
            })
            .then((offer) => {
                offer.remove();
                return offer;
            })
            .then((saved) => {
                callback.onSuccess({}, "Offer id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateOffer(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['offerPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['offerPicture'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['offerPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.offerPicture = targetDir + fileName;
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
                if (req.body.offerCode != undefined) {
                    req.checkBody('offerCode', 'offerCode is required').notEmpty();
                }
                if (req.body.discountTypePercentage != undefined) {
                    req.checkBody('discountTypePercentage', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                }
                if (req.body.discountTypeFlat != undefined) {
                    req.checkBody('discountTypeFlat', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                }
                if (req.body.offerOnline != undefined) {
                    req.checkBody('offerOnline', 'Either offerOnline is true or offerOffline is true').isOneTrue(req.body.offerOnline, req.body.offerOffline);
                }
                if (req.body.offerOffline != undefined) {
                    req.checkBody('offerOffline', 'Either offerOffline is true or offerOnline is true').isOneTrue(req.body.offerOnline, req.body.offerOffline);
                }
                if (req.body.discountTypePercentage && (req.body.percentageDiscount != undefined)) {
                    req.checkBody('percentageDiscount', 'Percentage should be between 1 to 100').checkNumberRange(req.body.percentageDiscount, 1, 100);
                }
                if (req.body.discountTypeFlat && (req.body.flatDiscount != undefined)) {
                    req.checkBody('flatDiscount', 'flatDiscount should be number').isInt();
                }
                if (req.body.startDate != undefined) {
                    req.checkBody('startDate', 'startDate must be in future and less than endDate').checkDateValidity(req.body.startDate, req.body.endDate);
                    req.checkBody('startDate', 'startDate must be in format of mm/dd/yyyy').isDate();
                }
                if (req.body.endDate != undefined) {
                    req.checkBody('endDate', 'endDate must be in future and greater than startDate').checkDateValidity(req.body.startDate, req.body.endDate);
                    req.checkBody('endDate', 'endDate must be in format of mm/dd/yyyy').isDate();
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
                        return new Promise(function (resolve, reject) {
                            OfferModel.findOne({ _id: req.params.id }, function (err, offer) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!offer) {
                                        reject(new NotFoundError("offer not found"));
                                    } else {
                                        resolve(offer);
                                    }
                                }
                            })
                        });
                    })
                    .then((offer) => {
                        for (var key in data) {
                            offer[key] = data[key];
                        }
                        offer.save();
                        return offer;
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

    getSingleOffer(user, req, callback) {
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
                    OfferModel.aggregate(
                        { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
                        // {
                        //     "$lookup": {
                        //         "from": 'catalogs',
                        //         "localField": "storeId",
                        //         "foreignField": "storeId",
                        //         "as": "catalogsInfo"
                        //     }
                        // },
                        // {
                        //     "$lookup": {
                        //         "from": 'stores',
                        //         "localField": "storeId",
                        //         "foreignField": "_id",
                        //         "as": "storesInfo"
                        //     }
                        // },
                        // {
                        //     "$lookup": {
                        //         "from": 'catalogs',
                        //         "localField": "storesInfo.featureCatalog",
                        //         "foreignField": "_id",
                        //         "as": "featureCatalog"
                        //     }
                        // },
                        {
                            $unwind: {
                                path: "$claimedOfferBy",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                offerName: 1,
                                offerPicture: 1,
                                offerDescription: 1,
                                offerCode: 1,
                                aplicableForAll: 1,
                                discountTypePercentage: 1,
                                discountTypeFlat: 1,
                                storeId: 1,
                                orderAbovePrice: 1,
                                offerOnline: 1,
                                offerOffline: 1,
                                percentageDiscount: 1,
                                flatDiscount: 1,
                                startDate: 1,
                                endDate: 1,
                                // storesInfo: {
                                //     storeName: 1,
                                //     storeLogo: 1,
                                //     storeBanner: 1,
                                //     avgRating: 1,
                                //     address: 1,
                                // },
                                // featureCatalog: {
                                //     catalogUrl: 1,
                                //     catalogDescription: 1
                                // },
                                // catalogsInfo: {
                                //     catalogUrl: 1,
                                //     catalogDescription: 1
                                // },
                                isClaimedByMe: {
                                    $cond: {
                                        if: { $eq: ["$claimedOfferBy", mongoose.Types.ObjectId(user.id)] },
                                        then: true,
                                        else: false
                                    }
                                },
                            }
                        },
                        {
                            $group: {
                                _id: '$_id',
                                offerName: { $first: '$offerName' },
                                offerPicture: { $first: '$offerPicture' },
                                offerDescription: { $first: '$offerDescription' },
                                offerCode: { $first: '$offerCode' },
                                aplicableForAll: { $first: '$aplicableForAll' },
                                discountTypePercentage: { $first: '$discountTypePercentage' },
                                discountTypeFlat: { $first: '$discountTypeFlat' },
                                orderAbovePrice: { $first: '$orderAbovePrice' },
                                storeId: { $first: '$storeId' },
                                percentageDiscount: { $first: '$percentageDiscount' },
                                flatDiscount: { $first: '$flatDiscount' },
                                startDate: { $first: '$startDate' },
                                endDate: { $first: '$endDate' },
                                isSave: { $max: '$isSave' },
                                isClaimedByMe: { $max: '$isClaimedByMe' }
                            }
                        },
                        // {
                        //     $unwind: {
                        //         path: "$featureCatalog",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
                        // {
                        //     $unwind: {
                        //         path: "$storesInfo",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
                        // {
                        //     $unwind: {
                        //         path: "$catalogsInfo",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
                        function (err, offer) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!offer) {
                                    reject(new NotFoundError("Offer not found"));
                                } else {
                                    resolve(offer);
                                }
                            }
                        })
                })

            }).then((offer) => {
                offer.startDate = this.getDDMMMYYYY(offer.startDate)
                offer.endDate = this.getDDMMMYYYY(offer.endDate)
                callback.onSuccess(offer);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }

    getStoreOffer(user, req, callback) {
        let data = req.body;
        var today = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + new Date().getFullYear()
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
                    OfferModel.find({ "storeId": { "$in": [mongoose.Types.ObjectId(req.params.id)] }, endDate: { '$gte': new Date(today) } }).lean().populate({ path: 'storeId', select: ['storeName'], model: 'Store' }).exec(function (err, offers) {
                        for (var i = 0; i < offers.length; i++) {
                            offers[i].is_claimed_by_me = false;
                            if (offers[i].claimedOfferBy == undefined) {
                                offers[i].claimedOfferBy = [];
                            }
                            for (var j = 0; j < offers[i].claimedOfferBy.length; j++) {
                                if (offers[i].claimedOfferBy[j] == user.id) {
                                    offers[i].is_claimed_by_me = true;
                                    break;
                                }
                            }
                        }
                        resolve(offers);
                    })
                });
            }).then((Offers) => {
                for (var i = 0; i < Offers.length; i++) {
                    Offers[i].startDate = this.getDDMMMYYYY(Offers[i].startDate)
                    Offers[i].endDate = this.getDDMMMYYYY(Offers[i].endDate)
                }
                callback.onSuccess(Offers);
            }).catch((error) => {
                callback.onError(error);
            });
    }

    // getStoreOffer(user, req, callback) {
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
    //                 OfferModel.aggregate(
    //                     { "$match": { "storeId": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
    //                     {
    //                         $unwind: {
    //                             path: "$savedBy",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         $unwind: {
    //                             path: "$claimedOfferBy",
    //                             preserveNullAndEmptyArrays: true
    //                         }
    //                     },
    //                     {
    //                         $project: {
    //                             _id: 1,
    //                             isSave: {
    //                                 $cond: {
    //                                     if: { $eq: ["$savedBy", mongoose.Types.ObjectId(user.id)] },
    //                                     then: true,
    //                                     else: false
    //                                 }
    //                             },
    //                             isClaimedByMe: {
    //                                 $cond: {
    //                                     if: { $eq: ["$claimedOfferBy", mongoose.Types.ObjectId(user.id)] },
    //                                     then: true,
    //                                     else: false
    //                                 }
    //                             },
    //                             offerName: 1,
    //                             offerPicture: 1,
    //                             offerDescription: 1,
    //                             offerCode: 1,
    //                             aplicableForAll: 1,
    //                             discountTypePercentage: 1,
    //                             discountTypeFlat: 1,
    //                             storeId: 1,
    //                             orderAbovePrice: 1,
    //                             offerOnline: 1,
    //                             offerOffline: 1,
    //                             percentageDiscount: 1,
    //                             flatDiscount: 1,
    //                             startDate: 1,
    //                             endDate: 1,
    //                         }
    //                     },
    //                     {
    //                         $group: {
    //                             _id: '$_id',
    //                             offerName: { $first: '$offerName' },
    //                             offerPicture: { $first: '$offerPicture' },
    //                             offerDescription: { $first: '$offerDescription' },
    //                             offerCode: { $first: '$offerCode' },
    //                             aplicableForAll: { $first: '$aplicableForAll' },
    //                             discountTypePercentage: { $first: '$discountTypePercentage' },
    //                             discountTypeFlat: { $first: '$discountTypeFlat' },
    //                             orderAbovePrice: { $first: '$orderAbovePrice' },
    //                             storeId: { $first: '$storeId' },
    //                             percentageDiscount: { $first: '$percentageDiscount' },
    //                             flatDiscount: { $first: '$flatDiscount' },
    //                             startDate: { $first: '$startDate' },
    //                             endDate: { $first: '$endDate' },
    //                             isSave: { $max: '$isSave' },
    //                             isClaimedByMe: { $max: '$isClaimedByMe' }
    //                         }
    //                     },
    //                     function (err, offer) {
    //                         if (err !== null) {
    //                             reject(err);
    //                         } else {
    //                             if (!offer) {
    //                                 reject(new NotFoundError("Offer not found"));
    //                             } else {
    //                                 resolve(offer);
    //                             }
    //                         }
    //                     })
    //             });
    //         })

    //         //          find({"storeId" : req.params.id})
    //         //         .populate([{ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner', 'avgRating', 'addreess', 'featureCatalog'],  model: 'Store'} ,
    //         //         {
    //         //             path: 'storeId.', select: ['catalogUrl', 'catalogDescription'],  model: 'Catalog'
    //         //         }])
    //         //         .exec(function(err, offer) {
    //         //             if (err !== null) {
    //         //                 reject(err);
    //         //             } else {
    //         //                 if (!offer) {
    //         //                     reject(new NotFoundError("Offer not found"));
    //         //                 } else {
    //         //                     resolve(offer);
    //         //                 }
    //         //             }
    //         //         })
    //         //     });
    //         // })
    //         .then((offer) => {
    //             callback.onSuccess(offer);
    //         })
    //         .catch((error) => {
    //             callback.onError(error);
    //         });
    // }

    saveOffer(req, callback) {
        let data = req.body;
        req.checkBody('offerId', 'Invalid urlparam').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    var save = req.body.save;
                    if (save) {
                        OfferModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.offerId),
                            'savedBy': { '$ne': mongoose.Types.ObjectId(req.body.userId) }
                        },
                            {
                                '$addToSet': { 'savedBy': mongoose.Types.ObjectId(req.body.userId) }
                            }, { 'new': true, 'multi': true }).exec(function (err, offer) {
                                offer.saveCount = offer.saveCount + 1;
                                offer.isSave = save;
                                offer.save()
                                resolve(offer);
                            })
                    } else if (!save) {
                        OfferModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.offerId),
                            'savedBy': mongoose.Types.ObjectId(req.body.userId)
                        },
                            {
                                "$pull": { "savedBy": mongoose.Types.ObjectId(req.body.userId) }
                            }, { 'new': true, 'multi': true }).exec(function (err, offer) {
                                offer.saveCount = offer.saveCount - 1;
                                offer.isSave = save;
                                offer.save()
                                resolve(offer);
                            })
                    }
                });
            })
            .then((offer) => {
                callback.onSuccess(offer);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllOffersWithFilter(user, req, callback) {
        let data = req.body;
        var ObjectID = require('mongodb').ObjectID;
        var matchQuery = [];
        var qString = {};

        let query = req.query;
        var today = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + new Date().getFullYear()

        let mongoQuery = { endDate: { '$gte': new Date(today) } };
        let skip = 0;
        let limit = 10;

        for (var key in query) {
            if (key == "offerOnline") {
                mongoQuery['offerOnline'] = ('true' === query[key]);
            } else if (key == "offerOffline") {
                mongoQuery['offerOffline'] = ('true' === query[key]);
            } else if (key == "startOffers") {
                skip = parseInt(query[key]);
            } else if (key == "endOffers") {
                limit = parseInt(query[key]) - skip + 1;
            }
        }

        // for (var param in req.query) {
        //     qString = {};
        //     if (param == "offerOnline" || param == "offerOffline") {
        //         qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : { $regex: req.query[param] };
        //         matchQuery.push(qString);
        //     }
        // }

        new Promise(function (resolve, reject) {
            req.getValidationResult()
                .then(function (result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }
                    return new Promise(function (resolve, reject) {
                        OfferModel.find(mongoQuery).lean().populate({ path: 'storeId', select: ['storeName'], model: 'Store' }).exec(function (err, offers) {
                            for (var i = 0; i < offers.length; i++) {
                                offers[i].is_claimed_by_me = false;
                                if (offers[i].claimedOfferBy == undefined) {
                                    offers[i].claimedOfferBy = [];
                                }

                                for (var j = 0; j < offers[i].claimedOfferBy.length; j++) {
                                    if (offers[i].claimedOfferBy[j] == user.id) {
                                        offers[i].is_claimed_by_me = true;
                                        break;
                                    }
                                }
                            }
                            resolve(offers);
                        })
                    });

                }).then((Offers) => {
                    for (var i = 0; i < Offers.length; i++) {
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                        var new_date = new Date(Offers[i].startDate);
                        Offers[i].startDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                        new_date = new Date(Offers[i].endDate);
                        Offers[i].endDate = new_date.getDate() + ' '
                            + months[new_date.getMonth()] + ' '
                            + new_date.getFullYear();
                    }
                    callback.onSuccess(Offers);
                }).catch((error) => {
                    callback.onError(error);
                });
        });
    }

    getAllOffers(user, req, callback) {
        var today = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + new Date().getFullYear()
        new Promise(function (resolve, reject) {
            OfferModel.aggregate(
                { $match: { endDate: { '$gte': new Date(today) } } },
                {
                    $unwind: {
                        path: "$savedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$claimedOfferBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        isSave: {
                            $cond: {
                                if: { $eq: ["$savedBy", mongoose.Types.ObjectId(user.id)] },
                                then: true,
                                else: false
                            }
                        },
                        offerName: 1,
                        offerPicture: 1,
                        offerDescription: 1,
                        aplicableForAll: 1,
                        discountTypePercentage: 1,
                        discountTypeFlat: 1,
                        storeId: 1,
                        isClaimedByMe: {
                            $cond: {
                                if: { $eq: ["$claimedOfferBy", mongoose.Types.ObjectId(user.id)] },
                                then: true,
                                else: false
                            }
                        },
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        offerName: { $first: '$offerName' },
                        offerPicture: { $first: '$offerPicture' },
                        offerDescription: { $first: '$offerDescription' },
                        offerCode: { $first: '$offerCode' },
                        aplicableForAll: { $first: '$aplicableForAll' },
                        discountTypePercentage: { $first: '$discountTypePercentage' },
                        discountTypeFlat: { $first: '$discountTypeFlat' },
                        dateModified: { $first: '$dateModified' },
                        storeId: { $first: '$storeId' },
                        startDate: { $first: '$startDate' },
                        endDate: { $first: '$endDate' },
                        isSave: { $max: '$isSave' },
                        isClaimedByMe: { $max: '$isClaimedByMe' }
                    }
                },
                function (err, offer) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!offer) {
                            reject(new NotFoundError("Offer not found"));
                        } else {
                            resolve(offer);
                        }
                    }
                }
            );
        })
            .then((Offers) => {
                for (var i = 0; i < Offers.length; i++) {
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                    var new_date = new Date(Offers[i].startDate);
                    Offers[i].startDate = new_date.getDate() + ' '
                        + months[new_date.getMonth()] + ' '
                        + new_date.getFullYear();
                    new_date = new Date(Offers[i].endDate);
                    Offers[i].endDate = new_date.getDate() + ' '
                        + months[new_date.getMonth()] + ' '
                        + new_date.getFullYear();
                }
                callback.onSuccess(Offers);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllWithoutLogin(req, callback) {
        let query = req.query;
        var today = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + new Date().getFullYear()

        let mongoQuery = { endDate: { '$gte': new Date(today) } };
        let skip = 0;
        let limit = 10;

        for (var key in query) {
            if (key == "offerOnline") {
                mongoQuery['offerOnline'] = ('true' === query[key]);
            } else if (key == "offerOffline") {
                mongoQuery['offerOffline'] = ('true' === query[key]);
            } else if (key == "startOffers") {
                skip = parseInt(query[key]);
            } else if (key == "endOffers") {
                limit = parseInt(query[key]) - skip + 1;
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
                    OfferModel.find(mongoQuery).skip(skip).limit(limit).sort().lean().populate({ path: 'storeId', select: ['storeName'], model: 'Store' }).exec(function (err, results) {
                        resolve(results);
                    })
                });
            }).then((Offers) => {
                for (var i = 0; i < Offers.length; i++) {
                    Offers[i].startDate = this.getDDMMMYYYY(Offers[i].startDate)
                    Offers[i].endDate = this.getDDMMMYYYY(Offers[i].endDate)
                }
                callback.onSuccess(Offers);
            }).catch((error) => {
                callback.onError(error);
            });

        // new Promise(function (resolve, reject) {
        //     OfferModel.find({},
        //         function (err, offer) {
        //             if (err !== null) {
        //                 reject(err);
        //             } else {
        //                 if (!offer) {
        //                     reject(new NotFoundError("Offer not found"));
        //                 } else {
        //                     resolve(offer);
        //                 }
        //             }
        //         }
        //     );
        // })
        //     .then((offer) => {
        //         callback.onSuccess(offer);
        //     })
        //     .catch((error) => {
        //         callback.onError(error);
        //     });
    }

    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }

    getDDMMMYYYY(date1) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var new_date = new Date(date1);
        var dateStr = new_date.getDate() + ' '
            + months[new_date.getMonth()] + ' '
            + new_date.getFullYear();
        return dateStr;
    }
}

module.exports = OfferHandler;
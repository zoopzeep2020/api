
/**
 * Created by WebrexStudio on 5/9/17.
 */
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
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
    /**
     * @swagger
     * /offers:
     *   post:
     *     tags:
     *       - Offer
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
     *       - name: offerName
     *         description: offerName
     *         in: body
     *         required: true
     *         type: string
     *       - name: offerDescription
     *         description: offerDescription
     *         in: body
     *         required: true
     *         type: string
     *       - name: storeId
     *         in: body
     *         description: storeId
     *         required: true
     *         type: string
     *       - name: aplicableForAll
     *         description: aplicableForAll
     *         in: body
     *         type: boolean
     *       - name: orderAbovePrice
     *         description: orderAbovePrice
     *         in: body
     *         type: number
     *       - name: discountTypePercentage
     *         description: discountTypePercentage
     *         in: body
     *         type: boolean
     *       - name: discountTypeFlat
     *         description: discountTypeFlat
     *         in: body
     *         type: boolean
     *       - name: percentageDiscount
     *         description: percentageDiscount
     *         in: body
     *         type: number
     *       - name: flatDiscount
     *         description: flatDiscount
     *         in: body
     *         type: number
     *       - name: startDate
     *         description: startDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: endDate
     *         description: endDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: offerPicture
     *         in: formData
     *         description: The uploaded file of offerPicture
     *         required: true
     *         type: file
     *         schema:
     *          $ref: '#/definitions/UpdateActivitiesObj'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /offers/{offerId}:
     *   put:
     *     tags:
     *       - Offer
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
     *       - name: offerName
     *         description: offerName
     *         in: body
     *         required: true
     *         type: string
     *       - name: offerId
     *         description: offerId
     *         in: path
     *         required: true
     *         type: string
     *       - name: offerDescription
     *         description: offerDescription
     *         in: body
     *         required: true
     *         type: string
     *       - name: storeId
     *         in: body
     *         description: storeId
     *         type: string
     *       - name: aplicableForAll
     *         description: aplicableForAll
     *         in: body
     *         type: boolean
     *       - name: orderAbovePrice
     *         description: orderAbovePrice
     *         in: body
     *         type: number
     *       - name: discountTypePercentage
     *         description: discountTypePercentage
     *         in: body
     *         type: boolean
     *       - name: discountTypeFlat
     *         description: discountTypeFlat
     *         in: body
     *         type: boolean
     *       - name: percentageDiscount
     *         description: percentageDiscount
     *         in: body
     *         type: number
     *       - name: flatDiscount
     *         description: flatDiscount
     *         in: body
     *         type: number
     *       - name: startDate
     *         description: startDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: endDate
     *         description: endDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: offerPicture
     *         in: formData
     *         description: The uploaded file of offerPicture
     *         required: true
     *         type: file
     *         schema:
     *          $ref: '#/definitions/UpdateActivitiesObj'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /offers/{offerId}:
     *   get:
     *     tags:
     *       - Offer
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: offerId
     *         description: offerId
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/search?{search}:
     *   get:
     *     tags:
     *       - Offer
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
     *       - name: search
     *         description: offer description or name
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/withfilter?{offerOnline}&{offerOffline}:
     *   get:
     *     tags:
     *       - Offer
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
     *       - name: offerOnline
     *         description: true or false
     *         in: path
     *         type: boolean
     *       - name: offerOffline
     *         description: true or false
     *         in: path
     *         type: boolean
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/store/{storeId}:
     *   get:
     *     tags:
     *       - Offer
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
     *       - name: storeId
     *         description: storeId
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/withoutlogin:
     *   get:
     *     tags:
     *       - Offer
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
     * /offers/save:
     *   put:
     *     tags:
     *       - Offer
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         type: string
     *       - name: offerId
     *         description: offerId
     *         in: body
     *         type: string
     *       - name: userId
     *         description: userId
     *         in: body
     *         type: string
     *       - name: save
     *         description: save
     *         in: body
     *         type: boolean
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers:
     *   get:
     *     tags:
     *       - Offer
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
 * @swagger
 * /offers/{offerId}:
 *   delete:
 *     tags:
 *       - Offer
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
 *       - name: offerId
 *         description: offerId
 *         in: path
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
     *       storeId:
     *         type: string
     *         required: true
     *       offerName:
     *         type: string
     *         required: true
     *       offerDescription:
     *         type: string
     *         required: true
     *       aplicableForAll:
     *         type: boolean
     *       orderAbovePrice:
     *         type: number
     *       discountTypePercentage:
     *         type: boolean
     *       discountTypeFlat:
     *         type: boolean
     *       percentageDiscount:
     *         type: number
     *       flatDiscount:
     *         type: number
     *       startDate:
     *         type: string
     *         format: date
     *       endDate:
     *         type: string
     *         format: date
     *       offerPicture:
     *         type: string
     */
    createNewOffer(req, callback) {
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
                req.checkBody('offerOnline', 'Either offerOnline is true or offerOffline is true').isOneOfTwoTrue(req.body.offerOnline, req.body.offerOffline);
                req.checkBody('offerOffline', 'Either offerOffline is true or offerOnline is true').isOneOfTwoTrue(req.body.offerOnline, req.body.offerOffline);
                req.checkBody('discountTypePercentage', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                req.checkBody('discountTypeFlat', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                if (req.body.discountTypePercentage) {
                    req.checkBody('percentageDiscount', 'Percentage should be between 1 to 100').checkNumberRange(req.body.percentageDiscount, 1, 100);
                }
                if (req.body.discountTypeFlat) {
                    req.checkBody('flatDiscount', 'flatDiscount should be number').isInt();
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
                    })
                    .then((offer) => {
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

    getOfferBySearch(req, callback) {
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
                        if (key == "offerSearch") {
                            mongoQuery['$or'] = [
                                { 'offerName': { $regex: new RegExp(query[key], 'i') } },
                                { 'offerDescription': { $regex: new RegExp(query[key], 'i') } }
                            ]
                        } else if (key == "startOffers") {
                            skip = parseInt(query[key]);
                        } else if (key == "endOffers") {
                            limit = parseInt(query[key]) - skip + 1;
                        }
                    }

                    OfferModel.find(mongoQuery).skip(skip).limit(limit).exec(function (err, results) {
                        resolve(results);
                    })
                });
            }).then((offer) => {
                callback.onSuccess(offer);
            })
            .catch((error) => {
                callback.onError(error);
            });
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
                });
            })
            .then((offer) => {
                callback.onSuccess(offer);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getStoreOffer(user, req, callback) {
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
                        { "$match": { "storeId": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
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
                                isClaimedByMe: {
                                    $cond: {
                                        if: { $eq: ["$claimedOfferBy", mongoose.Types.ObjectId(user.id)] },
                                        then: true,
                                        else: false
                                    }
                                },
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
                });
            })

            //          find({"storeId" : req.params.id})
            //         .populate([{ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner', 'avgRating', 'addreess', 'featureCatalog'],  model: 'Store'} ,
            //         {
            //             path: 'storeId.', select: ['catalogUrl', 'catalogDescription'],  model: 'Catalog'
            //         }])
            //         .exec(function(err, offer) {
            //             if (err !== null) {
            //                 reject(err);
            //             } else {
            //                 if (!offer) {
            //                     reject(new NotFoundError("Offer not found"));
            //                 } else {
            //                     resolve(offer);
            //                 }
            //             }
            //         })
            //     });
            // })
            .then((offer) => {
                callback.onSuccess(offer);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

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
        for (var param in req.query) {
            qString = {};
            if (param == "offerOnline" || param == "offerOffline") {
                qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : { $regex: req.query[param] };
                matchQuery.push(qString);
            }
        }
        new Promise(function (resolve, reject) {
            OfferModel.aggregate(
                {
                    "$match": { $and: matchQuery }
                },
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
                        isClaimedByMe: {
                            $cond: {
                                if: { $eq: ["$claimedOfferBy", mongoose.Types.ObjectId(user.id)] },
                                then: true,
                                else: false
                            }
                        },
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
                        offerOffline: { $first: '$offerOffline' },
                        offerOnline: { $first: '$offerOnline' },
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
            .then((posts) => {
                callback.onSuccess(posts);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllOffers(user, req, callback) {
        new Promise(function (resolve, reject) {
            OfferModel.aggregate(
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
            .then((posts) => {
                callback.onSuccess(posts);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllWithoutLogin(req, callback) {
        let query = req.query;
        let mongoQuery = {};
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
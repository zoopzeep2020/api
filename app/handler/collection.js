/**
 * Created by WebrexStudio on 5/9/17.
 */
const CollectionModel = require(APP_MODEL_PATH + 'collection').CollectionModel;
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const CityModel = require(APP_MODEL_PATH + 'city').CityModel;
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
    /**
     * @swagger
     * /collections:
     *   post:
     *     tags:
     *       - Collection
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
     *       - name: collectionName
     *         description: collectionName
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionType
     *         description: collectionType
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionPicture
     *         in: formData
     *         description: The uploaded file of collectionPicture
     *         type: file
     *       - name: catalogId
     *         description: catalogId
     *         in: body
     *         type: array
     *       - name: offerId
     *         description: offerId
     *         in: body
     *         type: array
     *       - name: buisnessOnline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: cityName
     *         description: cityName is array of cities
     *         in: body
     *         type: array
     *       - name: storeId
     *         description: storeId
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
     * /collections/{collectionId}:
     *   put:
     *     tags:
     *       - Collection
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
     *       - name: collectionName
     *         description: collectionName
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionId
     *         description: collectionId
     *         in: path
     *         required: true
     *         type: string
     *       - name: collectionType
     *         description: collectionType
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionPicture
     *         in: formData
     *         description: The uploaded file of collectionPicture
     *         type: file
     *       - name: catalogId
     *         description: catalogId
     *         in: body
     *         type: array
     *       - name: offerId
     *         description: offerId
     *         in: body
     *         type: array
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: array 
     *       - name: buisnessOnline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: cityName
     *         description: cityName is array of cities
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
     * /collections:
     *   get:
     *     tags:
     *       - Collection
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
    * /colections/{collectionId}:
    *   get:
    *     tags:
    *       - Collection
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
    *       - name: collectionId
    *         description: collectionId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
    /**
     * @swagger
     * /colections/{collectionId}:
     *   get:
     *     tags:
     *       - Collection
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
     *       - name: collectionId
     *         description: collectionId
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
   * @swagger
   * /colections/searchByQuery?{cityName}&{buisnessOnline}&{buisnessOffline}:
   *   get:
   *     tags:
   *       - Collection
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
   *       - name: cityName
   *         description: array of cityName
   *         in: query
   *         type: array
   *         items:
   *          type: string
   *         collectionFormat: multi
   *       - name: buisnessOnline
   *         description: buisnessOnline
   *         in: query
   *         type: boolean
   *       - name: buisnessOffline
   *         description: buisnessOffline
   *         in: query
   *         type: boolean
   *     responses:
   *       200:
   *         description: object of activity".     
   */
    /**
    * @swagger
    * definition:
    *   UpdateActivitiesObj:
    *     properties:
    *       collectionName:
    *         type: string
    *         required: true
    *       collectionType:
    *         type: string
    *         required: true
    *       collectionPicture:
    *         type: string
    *         required: true
    *       offerId:
    *         type: array
    *         items:
    *          type: string
    *       catalogId:
    *         type: array
    *         items:
    *          type: string
    *       storeId:
    *         type: array
    *         items:
    *          type: string
    */

    createNewCollection(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['collectionPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['collectionPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function (err) {
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
                        var fileName = files['collectionPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['collectionPicture'].path, targetDir + fileName, function (err) {
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

    getSingleCollection(req, callback) {
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
                    CollectionModel.aggregate([
                        { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
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
                        // {
                        //     $unwind: {
                        //         path: "$catalogId",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
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
                        // {
                        //     "$lookup": {
                        //         "from": 'catalogs',
                        //         "localField": "storesInfo._id",
                        //         "foreignField": "storeId",
                        //         "as": "storesInfo.catalogInfo"
                        //     }
                        // },
                        // {
                        //     "$lookup": {
                        //         "from": 'catalogs',
                        //         "localField": "storesInfo.featureCatalog",
                        //         "foreignField": "_id",
                        //         "as": "featureCatalogInfo"
                        //     }
                        // },
                        // {
                        //     "$lookup": {
                        //         "from": 'collections',
                        //         "localField": "_id",
                        //         "foreignField": "_id",
                        //         "as": "collectionInfo"
                        //     }
                        // },
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
                        // {
                        //     $unwind: {
                        //         path: "$catalogInfo",
                        //         preserveNullAndEmptyArrays: true
                        //     }
                        // },
                        // {
                        //     $unwind: {
                        //         path: "$collectionInfo",
                        //         preserveNullAndEmptyArrays: false
                        //     }
                        // },
                        // {
                        //     $unwind: {
                        //         path: "$featureCatalogInfo",
                        //         preserveNullAndEmptyArrays: false
                        //     }
                        // },
                        {
                            $group: {
                                _id: "$_id",
                                //   collectionInfo: { $addToSet: '$collectionInfo' },
                                storesInfo: { $addToSet: '$storesInfo' },
                                offerInfo: { $addToSet: '$offerInfo' },
                                //     catalogInfo: { $addToSet: '$catalogInfo' },
                                //  featureCatalogInfo: { $addToSet: '$featureCatalogInfo' }
                            },
                        },
                        // {
                        //     $unwind: {
                        //         path: "$collectionInfo",
                        //         preserveNullAndEmptyArrays: false
                        //     }
                        // },
                        // {
                        //     $project: {
                        //         'collectionName': '$collectionInfo.collectionName',
                        //         'collectionType': '$collectionInfo.collectionType',
                        //         'collectionPicture': '$collectionInfo.collectionPicture',
                        //         storesInfo: {
                        //             $filter: { input: "$storesInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                        //         },
                        //         offerInfo: {
                        //             $filter: { input: "$offerInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                        //         },
                        //         catalogInfo: {
                        //             $filter: { input: "$catalogInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                        //         },
                        //         featureCatalogInfo: {
                        //             $filter: { input: "$featureCatalogInfo", as: "a", cond: { $ifNull: ["$$a._id", true] } },
                        //         }
                        //     },
                        // },
                        // {
                        //     $project: {
                        //         collectionName: 1,
                        //         collectionType: 1,
                        //         collectionPicture: 1,
                        //         storesInfo: {
                        //             _id: 1,
                        //             storeName: 1,
                        //             storeLogo: 1,
                        //             storeBanner: 1,
                        //             avgRating: 1,
                        //         },
                        //         offerInfo: {
                        //             _id: 1,
                        //             offerName: 1,
                        //             offerPicture: 1,
                        //             offerDescription: 1,
                        //         },
                        //         catalogInfo: {
                        //             _id: 1,
                        //             catalogUrl: 1,
                        //             catalogDescription: 1,
                        //         },
                        //         featureCatalogInfo: {
                        //             _id: 1,
                        //             catalogUrl: 1,
                        //             catalogDescription: 1,
                        //         },
                        //     }
                        // },
                    ]).exec(function (err, results) {
                        resolve(results[0]);

                    })
                });
            })
            .then((results) => {
                if (results.storesInfo != undefined) {
                    var promises = [];
                    for (let i = 0; i < results.storesInfo.length; i++) {
                        promises.push(this.getStoreCatalog(i, results.storesInfo[i]._id));
                    }
                }
                return new Promise(function (resolve, reject) {
                    Promise.all(promises).then(function (catalogInfo) {
                        for (let i = 0; i < catalogInfo.length; i++) {
                            results.storesInfo[catalogInfo[i][0]]['catalogInfo'] = catalogInfo[i][1];
                        };
                        resolve(results);
                    });
                });
            })
            .then((collection) => {
                callback.onSuccess(collection);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

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
                mongoQuery['cityName'] = { "$in": [query[key]] };
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
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    CollectionModel.find(
                        mongoQuery
                    ).skip(skip).limit(limit).sort().exec(function (err, results) {
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
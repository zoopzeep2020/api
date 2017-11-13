/**
 * Created by crosp on 5/13/17.
 */
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const mongoose = require('mongoose');
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const KeywordModel = require(APP_MODEL_PATH + 'keyword').KeywordModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');
var path = require('path');
class StoreHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

/**
 * @swagger
 * /stores/{storeId}:
 *   put:
 *     tags:
 *       - Store
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
 *       - name: storeId
 *         description: storeId
 *         in: path
 *         required: true
 *         type: string
 *       - name: storeName
 *         description: storeName
 *         in: body
 *         type: string
 *       - name: storeLogo
 *         in: formData
 *         description: The uploaded file of storeLogo
 *         type: file
 *       - name: storeBanner
 *         in: formData
 *         description: The uploaded file of storeBanner
 *         type: file
 *       - name: categoriesIds
 *         description: categoriesIds
 *         in: body
 *         type: array
 *       - name: buisnessOnline
 *         description: buisnessOnline
 *         in: body
 *         type: boolean
 *       - name: buisnessOffline
 *         description: buisnessOffline
 *         in: body
 *         type: boolean
 *       - name: buisnessBoth
 *         description: buisnessBoth
 *         in: body
 *         type: boolean
 *       - name: address
 *         description: address
 *         in: body
 *         type: string
 *       - name: storePhone
 *         description: storePhone
 *         in: body
 *         type: number
 *       - name: storeDiscription
 *         description: storeDiscription
 *         in: body
 *         type: string
 *       - name: featureCatalog
 *         description: featureCatalog
 *         in: body
 *         type: string
 *       - name: webAddress
 *         description: webAddress
 *         in: body
 *         type: string
 *       - name: keyword
 *         description: keyword
 *         in: body
 *         type: array
 *       - name: otherKeyword
 *         description: otherKeyword
 *         in: body
 *         type: array
 *       - name: countries
 *         description: countries
 *         in: body
 *         type: array
 *       - name: dispatchDayMin
 *         description: dispatchDayMin
 *         in: body
 *         type: number
 *       - name: dispatchDayMax
 *         description: dispatchDayMax
 *         in: body
 *         type: number
 *       - name: customization
 *         description: customization
 *         in: body
 *         type: boolean
 *       - name: giftWrap
 *         description: giftWrap
 *         in: body
 *         type: boolean
 *       - name: cod
 *         description: cod
 *         in: body
 *         type: boolean
 *       - name: freeShiping
 *         description: freeShiping
 *         in: body
 *         type: boolean
 *       - name: returnandreplace
 *         description: returnandreplace
 *         in: body
 *         type: string
 *       - name: viewCount
 *         description: viewCount
 *         in: body
 *         type: number
 *       - name: reviewCount
 *         description: reviewCount
 *         in: body
 *         type: number
 *       - name: avgRating
 *         description: avgRating
 *         in: body
 *         type: number
 *       - name: isActive
 *         description: isActive
 *         in: body
 *         type: boolean
 *         default: false
 *       - name: location
 *         description: location
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
 * /stores:
 *   get:
 *     tags:
 *       - Store
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
 * /stores/{storeId}:
 *   get:
 *     tags:
 *       - Store
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
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */
/**
 * @swagger
 * /stores/{storeId}:
 *   delete:
 *     tags:
 *       - Store
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
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */
/**
 * @swagger
 * /stores/trendingStore?{lng}&{lat}:
 *   get:
 *     tags:
 *       - Store
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
 *       - name: lng
 *         description: lng
 *         in: query
 *         required: true
 *         type: number
 *       - name: lat
 *         description: lat
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: object of activity".     
 */
/**
 * @swagger
 * /stores/search?{search}:
 *   get:
 *     tags:
 *       - Store
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
 *         description: search
 *         in: query
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
 *       storeName:
 *         type: string
 *       storeLogo:
 *         type: string
 *       storeBanner:
 *         type: string
 *       categoriesIds:
 *         type: array
 *         items:
 *          type: string
 *       buisnessOnline:
 *         type: boolean
 *       buisnessOffline:
 *         type: boolean
 *       buisnessBoth:
 *         type: boolean
 *       address:
 *         type: string
 *       storePhone:
 *         type: number
 *       storeDiscription:
 *         type: string
 *       featureCatalog:
 *         type: number
 *       webAddress:
 *         type: string
 *       keyword:
 *         type: array
 *         items:
 *          type: string
 *       otherKeyword:
 *         type: array
 *         items:
 *          type: string
 *       countries:
 *         type: array
 *         items:
 *          type: string
 *       dispatchDayMin:
 *         type: number
 *       dispatchDayMax:
 *         type: number
 *       customization:
 *         type: boolean
 *       giftWrap:
 *         type: boolean
 *       cod:
 *         type: boolean
 *       freeShiping:
 *         type: boolean
 *       returnandreplace:
 *         type: string
 *       viewCount:
 *         type: number
 *       reviewCount:
 *         type: number
 *       avgRating:
 *         type: number
 *       isActive:
 *         type: boolean
 *       location:
 *         type: array
 *         items:
 *          type: number
 */
    static get STORE_VALIDATION_SCHEME() {
        return {
            'storeName': {
                isLength: {
                    options: [{ min: 2}],
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
        req.getValidationResult()
        .then(function(result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function(elem) {
                    return elem.msg;
                });
                throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
            }
            return new StoreModel({});
        })
        .then((store) => {
            store.viewCount = 1
            store.avgRating = 0
            store.save();
            return store;
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
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    StoreModel.findOne({ storeId: req.params.id }, function(err, store) {
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
            function(done, err) {
                if(files != undefined && typeof files['storeLogo'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['storeLogo'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['storeLogo'].path, targetDir + fileName, function(err) {
                            req.body.storeLogo = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    done(err, data);
                }
            },
            function(data, done, err) {
                if(files != undefined && typeof files['storeBanner'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['storeBanner'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['storeBanner'].path, targetDir + fileName, function(err) {
                            req.body.storeBanner = targetDir + fileName;
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
                if(req.body.storeName != undefined){
                    req.checkBody('storeName', 'category is required').notEmpty();
                }
                if(req.body.storeLogo != undefined){
                    req.checkBody('storeLogo', 'storeLogo is required').isImage(req.body.storeLogo);
                }
                if(req.body.categoriesIds != undefined){
                    req.checkBody('categoriesIds', 'minimum one categoriesIds is required').notEmpty();
                }
                if(req.body.keyword != undefined){
                    req.checkBody('keyword', 'minimum one keyword is required').notEmpty();
                }
                if(req.body.storeBanner != undefined){
                    req.checkBody('storeBanner', 'storeBanner is required').isImage(req.body.storeBanner);
                }
                if(req.body.buisnessBoth && req.body.buisnessOnline && req.body.buisnessOffline){
                    req.checkBody('buisnessBoth', 'only one of buisnessBoth, buisnessOnline and buisnessOffline should be true').isBoolean();
                }
                if(req.body.address != undefined){
                    req.checkBody('address', 'address must not be empty').notEmpty();
                }
                if(req.body.storePhone != undefined){
                    req.checkBody('storePhone', 'storePhone must not be empty').notEmpty();
                }
                if(req.body.storeDiscription != undefined){
                    req.checkBody('storeDiscription', 'storeDiscription must not be empty').notEmpty();
                }
                if(req.body.keyword != undefined){
                    req.checkBody('keyword', 'keyword must not be empty').notEmpty();
                }
                if(req.body.otherKeyword != undefined){
                    req.checkBody('otherKeyword', 'otherKeyword must not be empty').notEmpty();
                }
                if(req.body.webAddress != undefined){
                    req.checkBody('webAddress', 'webAddress must not be empty').notEmpty();
                }
                if(req.body.countries != undefined){
                    req.checkBody('countries', 'countries must not be empty').notEmpty();
                }
                if(req.body.dispatchDayMin != undefined){
                    req.checkBody('dispatchDayMin', 'dispatchDayMin must not be empty').notEmpty();
                }
                if(req.body.dispatchDayMax != undefined){
                    req.checkBody('dispatchDayMax', 'dispatchDayMax must not be empty').notEmpty();
                }
                if(req.body.customization != undefined){
                    req.checkBody('customization', 'customization must be true or false').isBoolean();
                }
                if(req.body.giftWrap != undefined){
                    req.checkBody('giftWrap', 'giftWrap must be true or false').isBoolean();
                }
                if(req.body.cod != undefined){
                    req.checkBody('cod', 'cod must be true or false').isBoolean();
                }
                if(req.body.freeShiping != undefined){
                    req.checkBody('freeShiping', 'freeShiping must be true or false').isBoolean();
                }
                if(req.body.returnandreplace != undefined){
                    req.checkBody('returnandreplace', 'returnandreplace must not be empty').notEmpty();
                }
                if(req.body.isActive != undefined){
                    req.checkBody('isActive', 'isActive must be true or false').isBoolean();
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        var errorMessages = {};
                        result.array().map(function(elem) {
                            return errorMessages[elem.param] = elem.msg;
                        }); 
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        StoreModel.findOne({ _id: req.params.id }, function(err, store) {
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
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });        
    }

    getSingleStore(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid store id provided').isMongoId();
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
                        { "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] }} },
                        {
                            "$lookup": {
                                "from": 'stores',
                                "localField": "_id",
                                "foreignField": "_id",
                                "as": "storesInfo"
                            }
                        },                
                        {
                            "$lookup": {
                                "from": 'catalogs',
                                "localField": "_id",
                                "foreignField": "storeId",
                                "as": "storeCatalogs"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'keywords',
                                "localField": "keyword",
                                "foreignField": "_id",
                                "as": "keywords"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'categories',
                                "localField": "categoriesIds",
                                "foreignField": "_id",
                                "as": "categoriesIds"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'offers',
                                "localField": "_id",
                                "foreignField": "storeId",
                                "as": "storeOffers"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'reviews',
                                "localField": "_id",
                                "foreignField": "storeId",
                                "as": "reviews",
                            },
                        },
                        {
                            $unwind: {
                                path: "$reviews",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "reviews.userId",
                                foreignField: "_id",
                                as: "reviews.users"
                            }
                        },
                        {
                            $unwind: {
                                path: "$reviews.users",
                                preserveNullAndEmptyArrays: true
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
                                path: "$storesInfo",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $group: {
                                _id : "$_id",
                                avgRating : { "$avg" : "$reviews.ratingScale"},
                                storesInfo:{ $addToSet: '$storesInfo' },
                                reviews: { $addToSet: '$reviews' },
                                keywords: { $addToSet: '$keywords' },
                                categoriesIds: { $addToSet: '$categoriesIds' },
                                storeOffers: { $addToSet: '$storeOffers' },
                                storeCatalogs: { $addToSet: '$storeCatalogs' }
                            },
                        },
                        {
                            $project: {
                                'storeName': '$storesInfo.storeName',
                                'isActive': '$storesInfo.isActive',
                                'address': '$storesInfo.address',
                                'storeLogo': '$storesInfo.storeLogo',
                                'storeBanner': '$storesInfo.storeBanner',
                                'otherKeyword': '$storesInfo.otherKeyword',
                                'buisnessOnline': '$storesInfo.buisnessOnline',
                                'buisnessOffline': '$storesInfo.buisnessOffline',
                                'buisnessBoth': '$storesInfo.buisnessBoth',
                                'storePhone': '$storesInfo.storePhone',
                                'storeDiscription': '$storesInfo.storeDiscription',
                                'webAddress': '$storesInfo.webAddress',
                                'countries': '$storesInfo.countries',
                                'dispatchDayMin': '$storesInfo.dispatchDayMin',
                                'dispatchDayMax': '$storesInfo.dispatchDayMax',
                                'customization': '$storesInfo.customization',
                                'giftWrap': '$storesInfo.giftWrap',
                                'cod': '$storesInfo.cod',
                                'viewCount':  "$storesInfo.viewCount",
                                'freeShiping': '$storesInfo.freeShiping',
                                'returnandreplace': '$storesInfo.returnandreplace',
                                'avgRating': {$divide:[{$subtract:[{$multiply:['$avgRating',10]}, { $mod: [{ $multiply: [ "$avgRating", 10 ] }, 1 ] },]},10]},
                                reviews: {
                                    $filter: { input: "$reviews", as: "a", cond: { $ifNull: ["$$a._id", false] } },                            
                                },
                                keywords: {
                                    $filter: { input: "$keywords", as: "a", cond: { $ifNull: ["$$a._id", false] } },
                                },
                                categoriesIds: {
                                    $filter: { input: "$categoriesIds", as: "c", cond: { $ifNull: ["$$c._id", false] } },
                                },
                                storeOffers: {
                                    $filter: { input: "$storeOffers", as: "c", cond: { $ifNull: ["$$c._id", false] } },
                                },
                                storeCatalogs: {
                                    $filter: { input: "$storeCatalogs", as: "c", cond: { $ifNull: ["$$c._id", false] } },
                                },
                            },
                        },
                        {
                            $unwind: {
                                path: "$storeName",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$isActive",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$address",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$viewCount",
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
                                path: "$storeBanner",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$buisnessOnline",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$buisnessOffline",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$buisnessBoth",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$storePhone",
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
                                path: "$webAddress",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$dispatchDayMin",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$dispatchDayMax",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$customization",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$giftWrap",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$cod",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$freeShiping",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$returnandreplace",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$countries",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$otherKeyword",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$keywords",
                                preserveNullAndEmptyArrays: true
                              }
                        }, 
                        {
                            $unwind: {
                                path: "$categoriesIds",
                                preserveNullAndEmptyArrays: true
                              }
                        }, 
                        {
                            $unwind: {
                                path: "$storeOffers",
                                preserveNullAndEmptyArrays: true
                              }
                        }, 
                        {
                            $unwind: {
                                path: "$storeCatalogs",
                                preserveNullAndEmptyArrays: true
                            }
                        },  
                        { 
                            $project : { 
                                dateModified: 0,
                                dateCreated:0,
                                __v:0,
                                categoriesIds:{
                                    dateModified: 0,
                                    dateCreated:0,
                                    __v:0,
                                },
                                keyword:{
                                    dateModified: 0,
                                    dateCreated:0,
                                    __v:0,
                                },
                                storeCatalogs:{
                                    dateModified: 0,
                                    dateCreated:0,
                                    __v:0,
                                },
                                storeOffers:{
                                    dateModified: 0,
                                    dateCreated:0,
                                    __v:0,
                                },
                                reviews:{
                                    dateModified: 0,
                                    dateCreated:0,  
                                    __v:0,
                                    users:{
                                        hashedPassword: 0,
                                        salt: 0,
                                        phone: 0,
                                        dateCreated:0,  
                                        isStore:0,  
                                        isUser:0,  
                                        iSAdmin:0,  
                                        resetPasswordExpires:0,  
                                        resetPasswordToken:0,  
                                        __v:0,
                                    }
                                },                                
                            } 
                        },         
                    ]).exec(function(err, results){
                        resolve(results);
                    })
                });
            })
            .then((result) => {   
                StoreModel.findOne({ _id: req.params.id }, function(err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.viewCount = store.viewCount + 1;
                            store.avgRating = result[0].avgRating;
                            store.save();
                        }
                    }
                }) 
                callback.onSuccess(result);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
   
    getTrendingStore(req, callback) {
        let data = req.body;
        req.checkQuery('lng', 'Invalid urlparam').notEmpty()
        req.checkQuery('lat', 'Invalid urlparam').notEmpty()
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                new Promise(function(resolve, reject) {
                    StoreModel.aggregate([
                        {
                            "$geoNear": {
                                "near": {
                                    "type": "Point",
                                    "coordinates": [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                                },
                                "distanceField": "distance",
                                "spherical": true,
                                "maxDistance": 0
                            }
                        },
                        {
                            $project: {
                                finalTotal: {
                                    $let: {
                                        vars: {
                                        total: { $divide: [ { $multiply: [ '$viewCount', 5 ] }, { $max: "$viewCount" }]},
                                        },
                                        in: { $add: [ "$avgRating", "$$total" ] }
                                    }
                                }
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
                                storeName:'$storesInfo.storeName',
                                avgRating:'$storesInfo.avgRating',
                                storeBanner:'$storesInfo.storeBanner',
                                storeDiscription:'$storesInfo.storeDiscription',
                                storeLogo:'$storesInfo.storeLogo',
                                finalTotal:'$finalTotal',
                                distance:'$distance',
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
                        {$sort:{finalTotal:-1}},
                        {$limit:5},
                    ])
                    .exec(function(err, results){
                        resolve(results);
                    }).then((results) => {   
                        callback.onSuccess(results);
                    })
                });
             })           
            .catch((error) => {
                callback.onError(error);
            });
    }

    getStoreBySearch(req, callback) {
        let data = req.body;      
        req.getValidationResult()
            .then(function(result) {                
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) { 
                    KeywordModel.aggregate(
                        {"$match":{"title" : {$regex : req.query.search}}},
                        {
                            $project:{
                                _id:1,
                            }
                        }
                    )
                    .exec(function(err, results){
                        resolve(results);
                    })
                });
            }).then((keywords) => {
                let objectAray = [];
                for(var i=0;i<keywords.length;i++){
                    objectAray[i] = mongoose.Types.ObjectId(keywords[i]._id);
                }
                return new Promise(function(resolve, reject) { 
                    StoreModel.find(
                    {
                        $or:[
                            {"storeName" : {$regex : req.query.search}},
                            {"storeDescription" : {$regex : req.query.search}},
                            {"keyword": { "$in": objectAray }}
                        ]
                    }).exec(function(err, results){
                        resolve(results);
                    })
                });
            })
            .then((stores) => {
                callback.onSuccess(stores);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllStores(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                StoreModel.find({}).populate({ path: 'categoriesIds', select: ['category', 'categoryImage', 'categoryActiveImage'] }).exec(function(err, store) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve(store);
                    }
                });
            })
            .then((store) => {
                callback.onSuccess(store);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    objectify(array) {
        if(array!== undefined){
            return array.reduce(function(p, c) {
                p[c['fieldname']] = c;
                return p;
            }, {});
        }
    }
}
module.exports = StoreHandler;
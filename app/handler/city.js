/**
 * Created by crosp on 5/13/17.
 */
const CityModel = require(APP_MODEL_PATH + 'city').CityModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const mongoose = require('mongoose');
class CityHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    /**
 * @swagger
 * /cities:
 *   get:
 *     tags:
 *       - City
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
 * /cities:
 *   post:
 *     tags:
 *       - City
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
 * /cities/{cityId}:
 *   put:
 *     tags:
 *       - City
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
 *       - name: cityId
 *         description: cityId
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
 * /cities/{cityId}:
 *   delete:
 *     tags:
 *       - City
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
 *       - name: cityId
 *         description: cityId
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
 * /cities/{cityId}:
 *   get:
 *     tags:
 *       - City
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
 *       - name: cityId
 *         description: cityId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */

 /**
 * @swagger
 * /cities/trendingcity:
 *   get:
 *     tags:
 *       - City
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
 * /cities/search?{city}:
 *   get:
 *     tags:
 *       - City
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
 *       - name: city
 *         description: city id
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
            'cityName': {
                isLength: {
                    options: [{ min: 2  }],
                    errorMessage: 'City title must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'City title required'
            },
        };
    }

    createNewCity(req, callback) {
        let data = req.body;
        let validator = this._validator;
        // req.checkBody(CityHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new CityModel(data);
            })
            .then((city) => {
                console.log(city)
                city.save();
                return city;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteCity(req, callback) {
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
                    CityModel.findOne({ _id: req.params.id }, function(err, city) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!city) {
                                reject(new NotFoundError("City not found"));
                            } else {
                                resolve(city);
                            }
                        }
                    })
                });
            })
            .then((city) => {
                city.remove();
                return city;
            })
            .then((saved) => {
                callback.onSuccess({}, "City id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCity(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.checkBody(CityHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function(resolve, reject) {
                    CityModel.findOne({ _id: req.params.id }, function(err, city) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!city) {
                                reject(new NotFoundError("City not found"));
                            } else {

                                resolve(city);
                            }
                        }
                    })
                });
            })
            .then((city) => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        city[key] = data[key];
                    }
                }  
                city.save();
                return city;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleCity(req, callback) {
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
                    CityModel.findOne({ _id: req.params.id }, function(err, city) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!city) {
                                reject(new NotFoundError("City not found"));
                            } else {
                                resolve(city);
                            }
                        }
                    })
                });
            })
            .then((city) => {
                city.viewCount = city.viewCount + 1;
                city.save();
                callback.onSuccess(city);
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
            qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param]== "true") ? req.query[param]=="true" : (req.query[param]== "false") ? req.query[param]=="true" : req.query[param];
            matchQuery.push(qString);             
        }
        req.checkQuery('city', 'Invalid urlparam').notEmpty()
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
                        { "$unwind" : "$city" },
                        { $match: { $and:  matchQuery } }  ,                    
                        {
                            "$lookup": {
                                "from": 'cities',
                                "localField": "city",
                                "foreignField": "_id",
                                "as": "cityInfo"
                            }
                        },
                        {
                            $project: {
                                storeName:'$storeName',
                                avgRating:'$avgRating',
                                storeLogo:'$storeLogo',
                                storeBanner:'$storeBanner',
                                title:'$cityInfo.title',
                                _id:'$cityInfo._id',
                                viewCount:'$cityInfo.viewCount',
                            }
                        },
                        { "$unwind" : "$title" },
                        { "$unwind" : "$viewCount" },
                        { "$unwind" : "$_id" },
                    ]).exec(function(err, results){
                        for(var i=0;i<results.length;i++){
                            objectArray[i]=mongoose.Types.ObjectId(results[i]._id)
                        }
                        resolve(results);
                    })
                });
            })
            .then((cities) => {
                return new Promise(function(resolve, reject) { 
                    CityModel.find({"_id" : { $in:  objectArray }}, function(err, cities) {
                        if (err !== null) {
                            reject(new NotFoundError("city not found"));
                        } else {
                            if (!cities) {
                                reject(new NotFoundError("city not found"));
                            } else {
                                for(var i=0;i<cities.length;i++){
                                    cities[i].viewCount = cities[i].viewCount + 1;
                                    cities[i].save();
                                }
                                resolve(cities)
                            }
                        }
                    }) 
                }) 
            })
            .then((city) => {
                callback.onSuccess(city);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchResultByWord(req, callback) {
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
                    CityModel.aggregate(
                        {"$match":{"title" : {$regex : req.query.search}}},
                        {
                            $project: {
                                _id:'$_id',
                                title:'$title',
                                viewCount:'$viewCount'
                            }
                        }
                    )
                    .exec(function(err, cities){
                        resolve(cities);
                    })
                });
            })
            .then((cities) => {
                return new Promise(function(resolve, reject) { 
                    CityModel.find({"title" : {$regex : req.query.search} }, function(err, cities) {
                        if (err !== null) {
                            reject(new NotFoundError("city not found"));
                        } else {
                            if (!cities) {
                                reject(new NotFoundError("city not found"));
                            } else {
                                for(var i=0;i<cities.length;i++){
                                    cities[i].viewCount = cities[i].viewCount + 1;
                                    cities[i].save();
                                }
                                resolve(cities)
                            }
                        }
                    }) 
                }) 
            }).then((cities)=>{
                callback.onSuccess(cities);
                
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCitys(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            CityModel.find({}, function(err, city) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!city) {
                        reject(new NotFoundError("City not found"));
                    } else {
                        resolve(city);
                    }
                }
            })
        })
        .then((city) => {
            callback.onSuccess(city);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllTrending(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            CityModel.aggregate([{ $sort : { viewCount : -1 },},{$limit:5}], function(err, city) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!city) {
                        reject(new NotFoundError("City not found"));
                    } else {
                        resolve(city);
                    }
                }
            })
        })
        .then((city) => {
            callback.onSuccess(city);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }
}

module.exports = CityHandler;
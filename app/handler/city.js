/**
 * Created by WebrexStudio on 5/13/17.
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
 * /cities/searchByWord?{search}:
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
 * /cities/searchByLongLat?{lng}&{lat}:
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
 *       - name: search
 *         description: name of city which you want to search 
 *         in: query
 *         required: true
 *         type: string
 *       - name: lng
 *         description: longitude of city
 *         in: query
 *         required: true
 *         type: number
 *       - name: lat
 *         description: latitude of city
 *         in: query
 *         required: true
 *         type: number
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
 *       - name: cityName
 *         description: cityName
 *         in: body
 *         required: true
 *         type: string
 *       - name: cityState
 *         description: cityState
 *         in: body
 *         required: true
 *         type: string
 *       - name: location
 *         description: location
 *         in: body
 *         required: true
 *         type: array
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
 *       - name: cityName
 *         description: cityName
 *         in: body
 *         required: true
 *         type: string
 *       - name: cityState
 *         description: cityState
 *         in: body
 *         required: true
 *         type: string
 *       - name: location
 *         description: location
 *         in: body
 *         required: true
 *         type: array
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
 * definition: 
 *   UpdateActivitiesObj:
 *     properties:
 *       cityName:
 *         type: string
 *         required: true
 *       cityState:
 *         type: string
 *         required: true
 *       location:
 *         type: array
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

    getSearchByWord(req, callback) {
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
                    CityModel.find({cityName : {$regex : req.query.search.toLowerCase()}},
                    )
                    .exec(function(err, cities){
                        resolve(cities);
                    })
                });
            }).then((cities)=>{
                callback.onSuccess(cities);
                
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchByLongLat(req, callback) {
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
                    }
                    )
                    .exec(function(err, cities){
                        resolve(cities);
                    })
                });
            }).then((cities)=>{
                callback.onSuccess(cities);
                
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCitys(req, callback) {
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
    
}

module.exports = CityHandler;
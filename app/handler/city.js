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
   
    static get KEYWORD_VALIDATION_SCHEME() {
        return {
            'cityName': {
                isLength: {
                    options: [{ min: 2 }],
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
            .then(function (result) {
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

    deleteCity(user, req, callback) {
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
                    CityModel.findOne({ _id:req.params.id }, function (err, city) {
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    CityModel.findOne({ _id: req.params.id }, function (err, city) {
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    CityModel.findOne({ _id: req.params.id }, function (err, city) {
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
                callback.onSuccess(city);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSearchByWord(req, callback) {
        let data = req.body;
        req.getValidationResult()
        .then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                CityModel.find({ cityName: { $regex: new RegExp(req.query.search.trim(), 'i') }  }).sort({ cityName: 1 }).lean().exec(function (err, city) {
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
        }).then((cities) => {
            callback.onSuccess(cities);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getSearchByLongLat(req, callback) {
        let data = req.body;
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
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
                    },
                    { $limit: 1 }
                ).exec(function (err, cities) {
                    resolve(cities);
                })
            });
        }).then((cities) => {
            callback.onSuccess(cities);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllCitys(req, callback) {
        let data = req.body;
        let query = req.query;
        let mongoQuery = {};
        let skip = 0;
        let limit = 0;
        for (var key in query) {
            if (key == "cityName") {
                mongoQuery['cityName'] =  { $regex: new RegExp(query[key].trim(), 'i') } 
            } 
        }
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            new Promise(function (resolve, reject) {
                CityModel.find(mongoQuery).sort({ cityName: 1 }).skip(skip).limit(limit).lean().exec(function (err, city) {
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
            }).then((city) => {
                callback.onSuccess(city);
            })
        }).catch((error) => {
            callback.onError(error);
        });
    }
}

module.exports = CityHandler;
/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const mkdirp = require('mkdirp');

class OfferHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewOffer(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');

        mkdirp(targetDir, function(err) {
            if (err) {
                callback.onError(err)
            }
            if (req.files.length > 0) {
                req.files.forEach(function(file) {
                    var fileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
                    fs.rename(file.path, targetDir + fileName, function(err) {
                        if (err) throw err;
                        req.body.offerPicture = targetDir + fileName;
                        let data = req.body;
                        req.getValidationResult()
                            .then(function(result) {
                                if (!result.isEmpty()) {
                                    var errorMessages = {};
                                    result.array().map(function(elem) {
                                        return errorMessages[elem.param] = elem.msg;
                                    });
                                    throw new ValidationError(errorMessages);
                                }

                                return new OfferModel({
                                    storeId: data.storeId,
                                    offerName: validator.trim(data.offerName),
                                    offerDescription: validator.trim(data.offerDescription),
                                    aplicableForAll: data.aplicableForAll,
                                    orderAbovePrice: data.orderAbovePrice,
                                    discountTypePercentage: data.discountTypePercentage,
                                    discountTypeFlat: data.discountTypeFlat,
                                    percentageDiscount: data.percentageDiscount,
                                    flatDiscount: data.flatDiscount,
                                    startDate: data.startDate,
                                    endDate: data.endDate,
                                    offerPicture: validator.trim(data.offerPicture)
                                });
                            })
                            .then((offer) => {
                                offer.save();
                                return offer;
                            })
                            .then((saved) => {
                                callback.onSuccess(saved);
                            })
                            .catch((error) => {
                                callback.onError(error);
                            });
                    });
                });
            }else{
                let err = {
                    status: 400,
                    message:"Images not found"
                }
                return callback.onError(err);
            }
        });
    }

    deleteOffer(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
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
                    OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
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

        mkdirp(targetDir, function(err) {
            if (err) {
                callback.onError(err)
            }

            if (req.files.length > 0) {
                req.files.forEach(function(file) {
                    var fileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
                    fs.rename(file.path, targetDir + fileName, function(err) {
                        if (err) throw err;
                        req.body.offerPicture = targetDir + fileName;
                        let data = req.body;
                        req.checkParams('id', 'Invalid id provided').isMongoId();
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
                                    OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
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
                                for (var key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        offer[key] = data[key];
                                    }
                                }  
                                offer.save();
                                return offer;
                            })
                            .then((saved) => {
                                callback.onSuccess(saved);
                            })
                            .catch((error) => {
                                callback.onError(error);
                            });
                    });
                });
            }else{
                let err = {
                    status: 400,
                    message:"Images not found"
                }
                return callback.onError(err);
            }

        });
    }

    getSingleOffer(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
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
                    OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
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

    getAllOffers(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                OfferModel.find({}, function(err, posts) {
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
}

module.exports = OfferHandler;
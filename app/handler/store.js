/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');

class StoreHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get STORE_VALIDATION_SCHEME() {
        return {
            'email': {
                isEmail: {
                    errorMessage: 'Invalid Email'
                },
                errorMessage: "Invalid email provided"
            }
        };
    }

    createNewStore(req, callback) {
        let data = req.body;
        let validator = this._validator;
        //    req.checkBody(StoreHandler.STORE_VALIDATION_SCHEME);
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
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
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
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');

        mkdirp(targetDir, function(err) {
            if (err) {
                callback.onError(err)
            }

            if (req.files) {
                async.each(req.files, function(file, callback) {
                    var fileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
                    fs.rename(file.path, targetDir + fileName, function(err) {
                        if (err) throw callback.onError(err);
                        req.body[file.fieldname] = targetDir + fileName;
                        callback(err);
                    });
                }, function(err) {
                    if (err) {
                        callback.onError(err);
                    } else {
                        let data = req.body;
                     //   req.checkBody(StoreHandler.STORE_VALIDATION_SCHEME);
                        req.getValidationResult()
                            .then(function(result) {
                                if (!result.isEmpty()) {
                                    let errorMessages = result.array().map(function(elem) {
                                        return elem.msg;
                                    });
                                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                                }
                                return new Promise(function(resolve, reject) {
                                    StoreModel.findOne({ _id: req.params.id }, function(err, store) {
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
                                store.storeName = validator.trim(data.storeName);
                                store.storeLogo = validator.trim(data.storeLogo);
                                store.storeBanner = validator.trim(data.storeBanner);
                                store.categoriesIds = data.categoriesIds;
                                store.buisnessOnline = data.buisnessOnline;
                                store.buisnessOffline = data.buisnessOffline;
                                store.buisnessBoth = data.buisnessBoth;
                                store.address = validator.trim(data.address);
                                store.storePhone = data.storePhone;
                                store.storeDiscription = validator.trim(data.storeDiscription);
                                store.keyword = data.keyword;
                                store.otherKeyword = data.otherKeyword;
                                store.storeCatalogs = data.storeCatalogs;
                                store.webAddress = validator.trim(data.webAddress);
                                store.countries = data.countries;
                                store.dispatchDayMin = data.dispatchDayMin;
                                store.dispatchDayMax = data.dispatchDayMax;
                                store.customization = data.customization;
                                store.giftWrap = data.giftWrap;
                                store.cod = data.cod;
                                store.freeShiping = data.freeShiping;
                                store.returnandreplace = validator.trim(data.returnandreplace);
                                store.isActive = data.isActive;
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
                });
            }
        });
    }

    getSingleStore(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid store id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    StoreModel.findOne({ _id: req.params.id }).populate({ path: 'categoriesIds', select: ['category', 'categoryImage', 'categoryActiveImage'] }).populate({ path: 'keyword', select: ['title'] }).populate({ path: 'storeCatalogs', select: ['catalogUrl', 'catalogDescription'] }).exec(function(err, store) {
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
                callback.onSuccess(store);
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
}

module.exports = StoreHandler;
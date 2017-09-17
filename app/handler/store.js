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

class StoreHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get STORE_VALIDATION_SCHEME() {
        return {
            'storeId': {
                notEmpty: false,
                errorMessage: 'Store Id required'
            },
        };
    }

    createNewStore(req, callback) {
        let data = req.body;
        let validator = this._validator;
        console.log(data);
        req.checkBody(StoreHandler.STORE_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                console.log(result);
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new StoreModel({
                    storeId: data.storeId,
                });
            })
            .then((store) => {
                store.save();
                return store;
            })
            .then((saved) => {
                callback.onSuccess(data);
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
                callback.onSuccess({}, "Store id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateStore(req, callback) {
        req.body.storeId = req.params.id;
        let data = req.body;
        let validator = this._validator;
        req.checkBody(StoreHandler.STORE_VALIDATION_SCHEME);
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
                store.storeName = validator.trim(data.storeName);
                store.storeLogo = validator.trim(data.storeLogo);
                store.storeBanner = validator.trim(data.storeBanner);
                store.categoriesIds = data.categoriesIds;
                store.buisnessOnline = data.buisnessOnline;
                store.buisnessOffline = data.buisnessOffline;
                store.buisnessBoth = data.buisnessBoth;
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

    getSingleStore(req, callback) {
        req.body.storeId = req.params.id;
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
                    StoreModel.findOne({ storeId: req.params.id }).populate({ path: 'categoriesIds', select: ['category', 'categoryImage', 'categoryActiveImage'] }).exec(function(err, store) {
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
/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const mkdirp = require('mkdirp');

class CatalogHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get CATALOG_VALIDATION_SCHEME() {
        return {
            'catalogUrl': {
                notEmpty: true,
                errorMessage: 'Catalog is required'
            },
            'catalogDescription': {
                isLength: {
                    options: [{ min: 2}],
                    errorMessage: 'Catalog description must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'Catalog description is required'
            }
        };
    }

    createNewCatalog(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');

        mkdirp(targetDir, function(err) {
            if (err) {
                callback.onError(err)
            }
            console.log(req.files ? req.files.length : 'req.files is null or undefined');
            if (req.files != undefined && req.files.length > 0 ) {
                req.files.forEach(function(file) {
                    var fileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
                    fs.rename(file.path, targetDir + fileName, function(err) {
                        if (err) throw err;
                        req.body.catalogUrl = targetDir + fileName;
                        let data = req.body;
                        req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
                        req.getValidationResult()
                            .then(function(result) {
                                if (!result.isEmpty()) {
                                    var errorMessages = {};
                                    result.array().map(function(elem) {
                                        return errorMessages[elem.param] = elem.msg;
                                    });
                                    throw new ValidationError(errorMessages);
                                }

                                return new CatalogModel({
                                    storeId: data.storeId,
                                    catalogUrl: validator.trim(data.catalogUrl),
                                    catalogDescription: validator.trim(data.catalogDescription),
                                });

                            })
                            .then((catalog) => {
                                catalog.save();
                                return catalog;
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

    deleteCatalog(req, callback) {
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
                    CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                resolve(catalog);
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                catalog.remove();
                return catalog;
            })
            .then((saved) => {
                callback.onSuccess({}, "Catalog id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCatalog(req, callback) {
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
                        req.body.catalogUrl = targetDir + fileName;
                        var data = req.body;
                        req.checkParams('id', 'Invalid id provided').isMongoId();
                        req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
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
                                    CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                                        if (err !== null) {
                                            reject(err);
                                        } else {
                                            if (!catalog) {
                                                reject(new NotFoundError("Catalog not found"));
                                            } else {
                                                resolve(catalog);
                                            }
                                        }
                                    })
                                });
                            })
                            .then((catalog) => {
                                console.log(data);
                                for (var key in data) {
                                    console.log(key,data[key]);
                                    catalog[key] = data[key];
                                    // if (data.hasOwnProperty(key)) {
                                       
                                    // }
                                }     
                                catalog.save();
                                return catalog;
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

    getSingleCatalog(req, callback) {
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
                    CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                resolve(catalog);
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                callback.onSuccess(catalog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCatalogs(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                CatalogModel.find({}, function(err, posts) {
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

    getCatalogByStoreId(req, callback) {
        let data = req.body;
        req.checkParams('storeId', 'Invalid storeId provided').isMongoId();
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
                    CatalogModel.find({ storeId: req.params.storeId }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                resolve(catalog);
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                callback.onSuccess(catalog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

}

module.exports = CatalogHandler;
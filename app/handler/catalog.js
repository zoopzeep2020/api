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
                isLength: {
                    options: [{ min: 2, max: 150 }],
                    errorMessage: 'Catalog title must be between 2 and 150 chars long'
                },
                errorMessage: 'Catalog is required'
            },
            'catalogDescription': {
                notEmpty: true,
                errorMessage: 'Catalog image is required'
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

            if (req.files) {
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
                                    let errorMessages = result.array().map(function(elem) {
                                        return elem.msg;
                                    });
                                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                                }
                                return new CatalogModel({
                                    catalogUrl: validator.trim(data.catalogUrl),
                                    catalogDescription: validator.trim(data.catalogDescription)
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
            }
        });
    }

    deleteCatalog(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid catalog id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
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

            if (req.files) {
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
                                    let errorMessages = result.array().map(function(elem) {
                                        return elem.msg;
                                    });
                                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
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
                                catalog.catalogUrl = validator.trim(data.catalogUrl);
                                catalog.catalogDescription = validator.trim(data.catalogDescription);
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
            }
        });

        // let data = req.body;
        // let validator = this._validator;
        // req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
        // req.getValidationResult()
        //     .then(function(result) {
        //         if (!result.isEmpty()) {
        //             let errorMessages = result.array().map(function(elem) {
        //                 return elem.msg;
        //             });
        //             throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
        //         }
        //         return new Promise(function(resolve, reject) {
        //             CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
        //                 if (err !== null) {
        //                     reject(err);
        //                 } else {
        //                     if (!catalog) {
        //                         reject(new NotFoundError("Catalog not found"));
        //                     } else {
        //                         resolve(catalog);
        //                     }
        //                 }
        //             })
        //         });
        //     })
        //     .then((catalog) => {
        //         catalog.catalogUrl = validator.trim(data.catalogUrl);
        //         catalog.catalogDescription = validator.trim(data.catalogDescription);
        //         catalog.save();
        //         return catalog;
        //     })
        //     .then((saved) => {
        //         callback.onSuccess(saved);
        //     })
        //     .catch((error) => {
        //         callback.onError(error);
        //     });
    }

    getSingleCatalog(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid catalog id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
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
}

module.exports = CatalogHandler;
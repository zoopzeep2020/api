/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const CategoryModel = require(APP_MODEL_PATH + 'category').CategoryModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

class CategoryHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get CATEGORY_VALIDATION_SCHEME() {
        return {
            'category': {
                notEmpty: true,
                isLength: {
                    options: [{ min: 2, max: 150 }],
                    errorMessage: 'Category title must be between 2 and 150 chars long'
                },
                errorMessage: 'Category is required'
            },
            'categoryImage': {
                notEmpty: true,
                errorMessage: 'Category image is required'
            },
            'categoryActiveImage': {
                notEmpty: true,
                errorMessage: 'Category active image is required'
            }
        };
    }

    createNewCategory(req, callback) {
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
                        req.body.storeId = req.params.id
                        let data = req.body;
                        req.checkBody(CategoryHandler.CATEGORY_VALIDATION_SCHEME);
                        req.getValidationResult()
                            .then(function(result) {
                                if (!result.isEmpty()) {
                                    let errorMessages = result.array().map(function(elem) {
                                        return elem.msg;
                                    });
                                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                                }
                                return new CategoryModel({
                                    category: validator.trim(data.category),
                                    categoryImage: validator.trim(data.categoryImage),
                                    categoryActiveImage: validator.trim(data.categoryActiveImage),
                                });
                            })
                            .then((category) => {
                                category.save();
                                return category;
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
                });
            }
        });
    }

    deleteCategory(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid category id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    CategoryModel.findOne({ _id: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Category not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((category) => {
                category.remove();
                return category;
            })
            .then((saved) => {
                callback.onSuccess({}, "Category id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCategory(req, callback) {
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
                        if (err) {
                            throw new ValidationError(err);
                        }
                        req.body[file.fieldname] = targetDir + fileName;
                        callback(err);
                    });
                }, function(err) {
                    if (err) {
                        callback.onError(err);
                    } else {
                        req.body.storeId = req.params.id
                        let data = req.body;
                        req.checkBody(CategoryHandler.CATEGORY_VALIDATION_SCHEME);
                        req.getValidationResult()
                            .then(function(result) {
                                if (!result.isEmpty()) {
                                    let errorMessages = result.array().map(function(elem) {
                                        return elem.msg;
                                    });
                                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                                }
                                return new Promise(function(resolve, reject) {
                                    CategoryModel.findOne({ _id: req.params.id }, function(err, category) {
                                        if (err !== null) {
                                            reject(err);
                                        } else {
                                            if (!category) {
                                                reject(new NotFoundError("Category not found"));
                                            } else {
                                                resolve(category);
                                            }
                                        }
                                    })
                                });
                            })
                            .then((category) => {
                                category.category = validator.trim(data.category);
                                category.categoryImage = validator.trim(data.categoryImage);
                                category.categoryActiveImage = validator.trim(data.categoryActiveImage);
                                category.save();
                                return category;
                            })
                            .then((saved) => {
                                const directory = './uploads';
                                fs.readdir(directory, (err, files) => {
                                    if (err) throw error;

                                    for (const file of files) {
                                        fs.unlink(path.join(directory, file), err => {
                                            if (err) throw error;
                                        });
                                    }
                                });
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

    getSingleCategory(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid category id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    CategoryModel.findOne({ _id: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Category not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((category) => {
                callback.onSuccess(category);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCategories(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                CategoryModel.find({}, function(err, posts) {
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

module.exports = CategoryHandler;
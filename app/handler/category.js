/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const CategoryModel = require(APP_MODEL_PATH + 'category').CategoryModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const InvalidPayloadError = require(APP_ERROR_PATH + 'invalid-payload');
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
                    options: [{ min: 2  }],
                    errorMessage: 'Category title must be 2 characters long'
                },
                errorMessage: 'Category is required'
            },
        };
    }


   
    createNewCategory(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['categoryImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['categoryImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['categoryImage'].path, targetDir + fileName, function(err) {
                            req.body.categoryImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done, err) {
                if(typeof files['categoryActiveImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['categoryActiveImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['categoryActiveImage'].path, targetDir + fileName, function(err) {
                            req.body.categoryActiveImage = targetDir + fileName;
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
                req.checkBody(CategoryHandler.CATEGORY_VALIDATION_SCHEME);
                if(req.body.categoryImage != undefined){
                    req.checkBody('categoryImage', 'categoryImage is required').isImage(req.body.categoryImage);
                }else{
                    req.checkBody('categoryImage', 'categoryImage is required').notEmpty();
                }

                if(req.body.categoryActiveImage != undefined){
                    req.checkBody('categoryActiveImage', 'categoryActiveImage is required').isImage(req.body.categoryActiveImage);
                }else{
                    req.checkBody('categoryActiveImage', 'categoryActiveImage  is required').notEmpty();
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new CategoryModel(data);
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
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });
    }

    

    deleteCategory(req, callback) {
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
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);        
        async.waterfall([
            function(done, err) {
                if(typeof files['categoryImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['categoryImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['categoryImage'].path, targetDir + fileName, function(err) {
                            req.body.categoryImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done, err) {
                if(typeof files['categoryActiveImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['categoryActiveImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['categoryActiveImage'].path, targetDir + fileName, function(err) {
                            req.body.categoryActiveImage = targetDir + fileName;
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
                if(req.body.category != undefined){
                    req.checkBody('category', 'category is required').notEmpty();
                }
                console.log(req.body.categoryImage)
                if(req.body.categoryImage != undefined){
                    req.checkBody('categoryImage', 'categoryImage is required').isImage(req.body.categoryImage);
                }

                if(req.body.categoryActiveImage != undefined){
                    req.checkBody('categoryActiveImage', 'categoryActiveImage is required').isImage(req.body.categoryActiveImage);
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        CategoryModel.findOne({ _id: req.params.id }, function(err, category) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!category) {
                                    reject(new NotFoundError("category not found"));
                                } else {
                                    resolve(category);
                                }
                            }
                        })
                    });
                })
                .then((category) => {
                    for (var key in data) {
                        category[key] = data[key];
                    }   
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
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });        
    }
    
    getSingleCategory(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
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
    objectify(array) {
        return array.reduce(function(p, c) {
             p[c['fieldname']] = c;
             return p;
        }, {});
    }
}

module.exports = CategoryHandler;
/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const KeywordModel = require(APP_MODEL_PATH + 'keyword').KeywordModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class KeywordHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get KEYWORD_VALIDATION_SCHEME() {
        return {
            'title': {
                notEmpty: false,
                errorMessage: 'Keyword title required'
            },
        };
    }

    createNewKeyword(req, callback) {

        // if (req.files) {
        //     req.files.forEach(function(file) {
        //         var fileName = (new Date).valueOf() + "-" + file.originalname;
        //         fs.rename(file.path, 'public/images/' + fileName, function(err) {
        //             if (err) throw err;
        //             req.body.fileName = fileName;
        //         })
        //     });
        // }

        let data = req.body;
        let validator = this._validator;
        req.checkBody(KeywordHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new KeywordModel({
                    title: validator.trim(data.title)
                });
            })
            .then((keyword) => {
                keyword.save();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteKeyword(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid keyword id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function(err, keyword) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!keyword) {
                                reject(new NotFoundError("Keyword not found"));
                            } else {
                                resolve(keyword);
                            }
                        }
                    })
                });
            })
            .then((keyword) => {
                keyword.remove();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess({}, "Keyword id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateKeyword(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(KeywordHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function(err, keyword) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!keyword) {
                                reject(new NotFoundError("Keyword not found"));
                            } else {

                                resolve(keyword);
                            }
                        }
                    })
                });
            })
            .then((keyword) => {
                keyword.title = validator.trim(data.title);
                keyword.save();
                return keyword;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleKeyword(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid keyword id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    KeywordModel.findOne({ _id: req.params.id }, function(err, category) {
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
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllKeywords(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                KeywordModel.find({}, function(err, category) {
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

            })
            .then((keyword) => {
                callback.onSuccess(keyword);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = KeywordHandler;
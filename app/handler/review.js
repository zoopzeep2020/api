/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class ReviewHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get REVIEW_VALIDATION_SCHEME() {
        return {
            'ratingScale': {
                notEmpty: false,
                errorMessage: 'rating Scale required'
            },
        };
    }

    createNewReview(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};
        req.checkBody(ReviewHandler.REVIEW_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        ModelData[key] = data[key];
                    }
                } 
                return new ReviewModel(ModelData);
            })
            .then((review) => {
                review.save();
                return review;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteReview(req, callback) {
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
                    ReviewModel.findOne({ _id: req.params.id }, function(err, review) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!review) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                resolve(review);
                            }
                        }
                    })
                });
            })
            .then((review) => {
                review.remove();
                return review;
            })
            .then((saved) => {
                callback.onSuccess({}, "Review id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateReview(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.checkBody(ReviewHandler.KEYWORD_VALIDATION_SCHEME);
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
                    ReviewModel.findOne({ _id: req.params.id }, function(err, review) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!review) {
                                reject(new NotFoundError("Review not found"));
                            } else {

                                resolve(review);
                            }
                        }
                    })
                });
            })
            .then((review) => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        review[key] = data[key];
                    }
                }
                review.save();
                return review;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleReview(req, callback) {
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
                    ReviewModel.findOne({ _id: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((review) => {
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllStoreReviews(req, callback) {
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
                    ReviewModel.find({ storeId: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((review) => {
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllUserReviews(req, callback) {
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
                    ReviewModel.find({ userId: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((review) => {
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllReviews(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                ReviewModel.find({}, function(err, category) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!category) {
                            reject(new NotFoundError("Review not found"));
                        } else {
                            resolve(category);
                        }
                    }
                })

            })
            .then((review) => {
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = ReviewHandler;
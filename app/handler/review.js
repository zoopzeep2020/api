/**
 * Created by crosp on 5/13/17.
 */
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ReportModel = require(APP_MODEL_PATH + 'report').ReportModel;
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

    static get REPORT_VALIDATION_SCHEME() {
        return {
            'description': {
                isLength: {
                    options: [{ min: 10  }],
                    errorMessage: 'description title must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'description required'
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
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
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
                StoreModel.findOne({ _id: req.body.storeId }, function(err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.avgRating = (store.avgRating*store.reviewCount + parseInt(ModelData.ratingScale))/(store.reviewCount+1);
                            store.reviewCount = store.reviewCount + 1;
                            store.save();
                        }
                    }
                }) 
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    createReportReview(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};
        req.checkBody(ReviewHandler.REPORT_VALIDATION_SCHEME);
        req.checkBody('reviewId', 'Invalid reviewId').isMongoId().notEmpty();
        req.checkBody('userId', 'Invalid userId').isMongoId().notEmpty();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    ReviewModel.findOne({ _id: req.body.reviewId }, function(err, review) {
                        console.log(req.body.reviewId)
                        if (err !== null) {
                            console.log()
                                reject(new NotFoundError("review not found"));
                        } else {
                            console.log("review",review);
                            if (review == null) {
                                reject(new NotFoundError("review not found"));
                            } 
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    ModelData[key] = data[key];
                                }
                            } 
                            resolve(new ReportModel(ModelData));
                        }
                    }) 
                })
            })
            .then((report) => {
                console.log("report",report)
                report.save();
                return report;
            })
            .then((saved) => {               
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteReview(user, req, callback) {
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
                    ReviewModel.findOne({ _id: req.params.id }, function(err, review) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!review) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                if(user.isAdmin || (review.userId === user.userId)){
                                    resolve(review);
                                }else{
                                    reject(new NotFoundError("you are not allow to remove this review"));
                                }
                            }
                        }
                    })
                });
            })
            .then((review) => {
                StoreModel.findOne({ _id: review.storeId }, function(err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.avgRating = (store.avgRating*store.reviewCount - review.ratingScale)/(store.reviewCount-1);
                            store.reviewCount = store.reviewCount - 1;
                            store.save();
                        }
                    }
                })
                return review;
            })
            .then((review) => {
                review.remove();
                return review;
            }).then((saved) => {     
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
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
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
                return new Promise(function(resolve, reject) {
                    StoreModel.findOne({ _id: review.storeId }, function(err, store) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!store) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                store.avgRating = (store.avgRating*store.reviewCount - review.ratingScale + req.body.ratingScale)/(store.reviewCount); 
                                console.log("store",store.avgRating)
                                store.save();
                                resolve(review)
                            }
                        }
                    })
                });
            })
            .then((review) => {
                console.log("review",review)                
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
                console.log("result",result)
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
                            resolve(review);
                        }
                        resolve(review);
                    })
                });
            })
            .then((review) => {
                console.log("review",review)
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
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    ReviewModel.find({ storeId: req.params.id }, function(err, review) {
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
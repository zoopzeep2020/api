/**
 * Created by crosp on 5/13/17.
 */
const ReviewCommentModel = require(APP_MODEL_PATH + 'reviewComment').ReviewCommentModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class ReviewCommentHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get REVIEWCOMMENT_VALIDATION_SCHEME() {
        return {
            'comment': {
                isLength: {
                    options: [{ min: 2  }],
                    errorMessage: 'Comment must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'Comment title required'
            },
        };
    }

    createNewReviewComment(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if( ( key == 'reviewId' || key == 'userId' )){
                    req.checkBody(key, 'Invalid '+ key +' provided').isMongoId();
                }
            }
        }         
        req.checkBody(ReviewCommentHandler.REVIEWCOMMENT_VALIDATION_SCHEME);        
        req.checkBody('reviewId', 'only one is allowed either reviewId or storeId').isOneTrue(req.body.userId == undefined,req.body.storeId  == undefined);
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
            return new ReviewCommentModel(ModelData);
        })
        .then((reviewComment) => {      
            reviewComment.save();
            return reviewComment;
        })
        .then((saved) => {
            callback.onSuccess(saved);      
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    deleteReviewComment(req, callback) {
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
                ReviewCommentModel.findOne({ _id: req.params.id }, function(err, reviewComment) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!reviewComment) {
                            reject(new NotFoundError("Comment not found"));
                        } else {
                            if(user.isAdmin || (review.userId === user.userId) || (review.storeId === user.storeId)){
                                resolve(reviewComment);
                            }else{
                                reject(new NotFoundError("you are not allow to remove this comment"));
                            }
                            resolve(reviewComment);
                        }
                    }
                })
            });
        })
        .then((reviewComment) => {
            reviewComment.remove();
            return reviewComment;
        })
        .then((saved) => {
            callback.onSuccess({}, "Comment id " + saved.id + " deleted successfully ");
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    updateReviewComment(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(ReviewCommentHandler.REVIEWCOMMENT_VALIDATION_SCHEME);
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
                ReviewCommentModel.findOne({ _id: req.params.id }, function(err, reviewComment) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!reviewComment) {
                            reject(new NotFoundError("Comment not found"));
                        } else {
                            resolve(reviewComment);
                        }
                    }
                })
            });
        })
        .then((reviewComment) => {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    reviewComment[key] = data[key];
                }
            }       
            reviewComment.save();
            return reviewComment;
        })
        .then((saved) => {
            callback.onSuccess(saved);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getSingleReviewComment(req, callback) {
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
                ReviewCommentModel.findOne({ _id: req.params.id }, function(err, category) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!category) {
                            reject(new NotFoundError("Comment not found"));
                        } else {
                            resolve(category);
                        }
                    }
                })
            });
        })
        .then((reviewComment) => {
            callback.onSuccess(reviewComment);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllReviewComments(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            ReviewCommentModel.find({}, function(err, category) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!category) {
                        reject(new NotFoundError("Comment not found"));
                    } else {
                        resolve(category);
                    }
                }
            })

        })
        .then((reviewComment) => {
            callback.onSuccess(reviewComment);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }
}

module.exports = ReviewCommentHandler;
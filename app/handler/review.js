/**
 * Created by WebrexStudio on 5/13/17.
 */
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
var request = require('request');

class ReviewHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
 

    createNewReview(req, callback) {
        let data = req.body;
        let ModelData = {};

        let validator = this._validator;
        let update = false;
        req.checkBody('ratingScale', 'rating Scale required').notEmpty();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function (resolve, reject) {
                    ReviewModel.findOne({ $and: [{ userId: req.body.userId }, { storeId: req.body.storeId }] }).exec(function (err, review) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (review) {
                                update = true;
                                resolve(review);
                            } else {
                                var review = new ReviewModel(req.body);
                                resolve(review);
                            }
                        }
                    });
                });
            })
            .then((review) => {
                return new Promise(function (resolve, reject) {
                    StoreModel.findById(review.storeId, function (err, store) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!store) {
                                reject(new NotFoundError("Store not found"));
                            } else {
                                if (update) {
                                    store.avgRating = (store.avgRating * store.reviewCount - parseFloat(review.ratingScale) + parseFloat(req.body.ratingScale)) / (store.reviewCount);
                                    store.save();
                                } else {
                                    store.avgRating = (store.avgRating * store.reviewCount + parseFloat(review.ratingScale)) / ((store.reviewCount) + 1);
                                    store.reviewCount = store.reviewCount + 1;
                                    store.save();
                                }
                                resolve(review);
                            }
                        }
                    })
                })
            })
            .then((review) => {
                UserModel.aggregate(
                    { "$match": { "storeId": review.storeId } },
                    function (err, stores) {
                        if (err !== null) {
                            return err;
                        } else {
                            if (!stores) {
                                return new NotFoundError("store not found");
                            } else {
                                ModelData['storeId'] = stores[0].storeID
                                ModelData['title'] = 'title'
                                ModelData['deviceToken'] = stores[0].deviceToken
                                ModelData['deviceType'] = stores[0].deviceType
                                ModelData['notificationType'] = 'bookmark'
                                ModelData['description'] = stores[0].name + ' has reviewed your store';
                                StoreNotificationModel(ModelData).save();
                                if (ModelData['deviceToken']) {
                                    if (ModelData['deviceType'] == 'Android') {
                                        sendAndroidNotification(ModelData)
                                    } else if (ModelData['deviceType'] == 'IOS') {
                                        sendAppleNotification(ModelData)
                                    }
                                }
                            }
                        }
                    })
                return review;
            }).then((review) => {
                for (var key in req.body) {
                    review[key] = req.body[key];
                }
                review.save();
                callback.onSuccess(review);
            }).catch((error) => {
                callback.onError(error);
            });
    }

    deleteReview(user, req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    ReviewModel.findOne({ _id: req.params.id }, function (err, review) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!review) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                if (user.isAdmin || (review.userId === user.userId)) {
                                    resolve(review);
                                } else {
                                    reject(new NotFoundError("you are not allow to remove this review"));
                                }
                            }
                        }
                    })
                });
            })
            .then((review) => {
                StoreModel.findOne({ _id: review.storeId }, function (err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.avgRating = (store.avgRating * store.reviewCount - parseFloat(review.ratingScale)) / (store.reviewCount - 1);
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function (resolve, reject) {
                    ReviewModel.findOne({ _id: req.params.id }, function (err, review) {
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
                return new Promise(function (resolve, reject) {
                    StoreModel.findOne({ _id: review.storeId }, function (err, store) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!store) {
                                reject(new NotFoundError("Review not found"));
                            } else {
                                store.avgRating = (store.avgRating * store.reviewCount - parseFloat(review.ratingScale) + parseFloat(req.body.ratingScale)) / (store.reviewCount);
                                store.save();
                                resolve(review)
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function (elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    ReviewModel.findOne({ _id: req.params.id })
                        .populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner', 'avgRating'], model: 'Store' })
                        .exec(function (err, review) {
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
                var datecreated;
                datecreated = review.dateCreated;
                review.timeDifference = this.getDDMMMYYYY(datecreated)
                review.save();
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    ReviewModel.find({ storeId: req.params.id })
                        .populate({ path: 'userId', select: ['name', 'userImage', 'phone', 'email'], model: 'User' }).exec(function (err, review) {
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
                var currdatetime = new Date();
                var datecreated;
                for (var i = 0; i < review.length; i++) {
                    datecreated = review[i].dateCreated;
                    review[i].timeDifference = this.getDDMMMYYYY(datecreated)
                    review[i].save();
                }
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
            .then(function (result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function (elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    ReviewModel.find({ userId: req.params.id })
                        .populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner', 'avgRating'], model: 'Store' }).exec(function (err, review) {
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
                var currdatetime = new Date();
                var datecreated;
                for (var i = 0; i < review.length; i++) {
                    datecreated = review[i].dateCreated;
                    review[i].timeDifference = this.getDDMMMYYYY(datecreated)
                    review[i].save();
                }
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllReviews(req, callback) {
        let data = req.body;
        return new Promise(function (resolve, reject) {
            ReviewModel.find({}).populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner', 'avgRating'], model: 'Store' })
                .exec(function (err, review) {
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
        }).then((review) => {
            var currdatetime = new Date();
            var datecreated;
            for (var i = 0; i < review.length; i++) {
                datecreated = review[i].dateCreated;
                review[i].timeDifference = this.getDDMMMYYYY(datecreated)
                review[i].save();
            }
            callback.onSuccess(review);
        }).catch((error) => {
            callback.onError(error);
        });
    }

    getDDMMMYYYY(date1) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var new_date = new Date(date1);
        var dateStr = new_date.getDate() + ' '
            + months[new_date.getMonth()] + ' '
            + new_date.getFullYear();
        return dateStr;
    }

    timeago(nd, s) {
        var o = {
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 1000 * 60,
            day: 24 * 60 * 1000 * 60,
            week: 7 * 24 * 60 * 1000 * 60,
            month: 30 * 24 * 60 * 1000 * 60,
            year: 365 * 24 * 60 * 1000 * 60
        };
        var obj = {};

        var r = Math.round,
            dir = ' ago',
            pl = function (v, n) {
                return (s === undefined) ? n + ' ' + v + (n > 1 ? 's' : '') + dir : n + v.substring(0, 1)
            },
            ts = Date.now() - new Date(nd).getTime(),
            ii;
        if (ts < 0) {
            ts *= -1;
            dir = ' from now';
        }
        for (var i in o) {
            if (r(ts) < o[i]) return pl(ii || 'm', r(ts / (o[ii] || 1)))
            ii = i;
        }
        return pl(i, r(ts / o[i]));
    }
}


module.exports = ReviewHandler;
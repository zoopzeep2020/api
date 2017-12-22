/**
 * Created by WebrexStudio on 5/13/17.
 */
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');

class ReviewHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    /**
 * @swagger
 * /reviews:
 *   post:
 *     tags:
 *       - Review
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: Content-Type
 *         description: content-type
 *         in: header
 *         required: true
 *         type: string
 *         default: application/json
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *       - name: storeId
 *         description: storeId
 *         in: body
 *         required: true
 *         type: string
 *       - name: ratingScale
 *         description: ratingScale
 *         in: body
 *         type: number
 *       - name: description
 *         description: description
 *         in: body
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */
    /**
  * @swagger
  * /reviews/{reviewId}:
  *   put:
  *     tags:
  *       - Review
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: token authorization
  *         in: header
  *         required: true
  *         type: string
  *       - name: Content-Type
  *         description: content-type
  *         in: header
  *         required: true
  *         type: string
  *         default: application/json
  *       - name: reviewId
  *         description: reviewId
  *         in: body
  *         required: true
  *         type: string
  *       - name: userId
  *         description: userId
  *         in: body
  *         type: string
  *       - name: storeId
  *         description: storeId
  *         in: body
  *         type: string
  *       - name: ratingScale
  *         description: ratingScale
  *         in: body
  *         type: number
  *       - name: description
  *         description: description
  *         in: body
  *         type: string
  *         schema:
  *          $ref: '#/definitions/UpdateActivitiesObj'
  *     responses:
  *       200:
  *         description: object of activity".
  */
    /**
     * @swagger
     * /reviews:
     *   get:
     *     tags:
     *       - Review
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /reviews/{reviewId}:
     *   get:
     *     tags:
     *       - Review
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: reviewId
     *         description: reviewId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /reviews/{reviewId}:
     *   delete:
     *     tags:
     *       - Review
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: reviewId
     *         description: reviewId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /reviews/store/{storeId}:
     *   get:
     *     tags:
     *       - Review
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: basic authorization
     *         in: header
     *         required: true
     *         type: string
     *         default: maximumvsminimumsecurity
     *       - name: storeId
     *         description: storeId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */

    /**
     * @swagger
     * /reviews/user/{userId}:
     *   get:
     *     tags:
     *       - Review
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: userId
     *         description: userId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
    * @swagger
    * definition:
    *   UpdateActivitiesObj:
    *     properties:
    *       userId:
    *         type: string
    *         required: true
    *       storeId:
    *         type: string
    *         required: true
    *       ratingScale:
    *         type: number
    *         required: true
    *       description:
    *         type: number
    *         required: true
    */

    createNewReview(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};
        req.checkBody('ratingScale', 'rating Scale should be between 1 to 5').notEmpty().checkNumberRange(req.body.ratingScale, 1, 5);
        req.getValidationResult()
            .then(function (result) {
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
                    ModelData.timeDifference = "";
                }
                return new ReviewModel(ModelData);
            })
            .then((ModelData) => {
                return new Promise(function (resolve, reject) {
                    ReviewModel.findOne({$and:[{ userId: req.body.userId },{ storeId: req.body.storeId }]}, function (err, review) {
                        if (review) {
                            reject(new AlreadyExistsError("you have already reviewed this store"));
                        } else {
                            resolve(ModelData);
                        }
                    })
                });
            })
            .then((saved) => {
                ReviewModel.findOne({ _id: req.params.id }, function (err, review) {
                    StoreModel.findOne({ _id: req.body.storeId }, function (err, store) {
                        if (err !== null) {
                            new NotFoundError("store not found");
                        } else {
                            if (!store) {
                                new NotFoundError("store not found");
                            } else {
                                saved.ratingScale = parseFloat(saved.ratingScale).toFixed(1)
                                store.avgRating = (store.avgRating * store.reviewCount + parseInt(ModelData.ratingScale)) / (parseInt(store.reviewCount) + 1);
                                store.reviewCount = store.reviewCount + 1;
                                store.save();
                            }
                        }
                    })
                })  

                saved.save();
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
        if (req.body.ratingScale != undefined) {
            req.checkBody('ratingScale', 'rating Scale should be between 1 to 5').notEmpty().checkNumberRange(req.body.ratingScale, 1, 5);
        }
        
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
                review.timeDifference = this.timeago(datecreated)
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
                    review[i].timeDifference = this.timeago(datecreated)
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
                    review[i].timeDifference = this.timeago(datecreated)
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
            ReviewModel.find({})
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
        })
            .then((review) => {
                var currdatetime = new Date();
                var datecreated;
                for (var i = 0; i < review.length; i++) {
                    datecreated = review[i].dateCreated;
                    review[i].timeDifference = this.timeago(datecreated)
                    review[i].save();
                }
                callback.onSuccess(review);
            })
            .catch((error) => {
                callback.onError(error);
            });
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
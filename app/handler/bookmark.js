
/**
 * Created by WebrexStudio on 5/13/17.
 */
const BookmarkModel = require(APP_MODEL_PATH + 'bookmark').BookmarkModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const mongoose = require('mongoose');

class BookmarkHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
    
    createNewBookmark(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody('userId', 'Invalid userId provided').isMongoId();
        req.checkBody('userId', 'userId is required').notEmpty();
        req.checkBody('storeId', 'storeId is required').notEmpty();
        req.checkBody('storeId', 'Invalid storeId provided').isMongoId();

        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new BookmarkModel(data);
            })
            .then((bookmark) => {
                bookmark.save();
                return bookmark;
            })
            .then((saved) => {
                StoreModel.findOne({ _id: req.body.storeId }, function (err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.bookmarkBy.push(req.body.userId);
                            store.bookmarkCount = store.bookmarkCount + 1;
                            store.save();
                        }
                    }
                })
                UserModel.findOne({ _id: req.body.userId }, function (err, user) {
                    if (err !== null) {
                        new NotFoundError("user not found");
                    } else {
                        if (!user) {
                            new NotFoundError("user not found");
                        } else {
                            user.bookmarkStores.push(req.body.storeId);
                            user.save();
                        }
                    }
                })
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error); 
            });
    }

    deleteBookmark(req, callback) {
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
                    BookmarkModel.findOne({ _id: req.params.id }, function (err, bookmark) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!bookmark) {
                                reject(new NotFoundError("Bookmark not found"));
                            } else {
                                resolve(bookmark);
                            }
                        }
                    })
                });
            })
            .then((bookmark) => {
                bookmark.remove();
                return bookmark;
            })
            .then((saved) => {
                StoreModel.findOne({ _id: req.body.storeId }, function (err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.bookmarkCount = store.bookmarkCount - 1;
                            store.save();
                        }
                    }
                })
                callback.onSuccess({}, "Bookmark id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateBookmark(req, callback) {
        let data = req.body;
        let validator = this._validator;
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
                    BookmarkModel.findOne({ _id: req.params.id }, function (err, bookmark) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!bookmark) {
                                reject(new NotFoundError("Bookmark not found"));
                            } else {
                                resolve(bookmark);
                            }
                        }
                    })
                });
            })
            .then((bookmark) => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        bookmark[key] = data[key];
                    }
                }
                bookmark.save();
                return bookmark;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleBookmark(user, req, callback) {
        let data = req.body;
        // req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    BookmarkModel.findOne({ _id: req.params.id }).populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner'], model: 'Store' }).exec(function (err, bookmark) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!bookmark) {
                                reject(new NotFoundError("Bookmark not found"));
                            } else {
                
                                resolve(bookmark);
                            }
                        }
                    })
                });
            })
            .then((bookmark) => {
                bookmark.isBookmarked = (user.id==bookmark.userId)
                bookmark.save()              
                callback.onSuccess(bookmark);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getUserBookmark(user, req, callback) {
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
                    BookmarkModel.aggregate(
                        [
                        {
                            "$match": { "userId": mongoose.Types.ObjectId(req.params.id) }
                        },
                        {
                            "$lookup": {
                                "from": 'stores',
                                "localField": "storeId",
                                "foreignField": "_id",
                                "as": "storesInfo"
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'catalogs',
                                "localField": "storeId",
                                "foreignField": "storeId",
                                "as": "catalogInfo"
                            }
                        },
                        {
                            $project: {
                                '_id': '$_id',
                                'storeId': '$storeId',
                                'userId': '$userId',
                                'storeName': '$storesInfo.storeName',
                                'address': '$storesInfo.address',
                                'storeLogo': '$storesInfo.storeLogo',
                                'storeBanner': '$storesInfo.storeBanner',
                                catalogInfo: {
                                    $filter: { input: "$catalogInfo", as: "c", cond: { $ifNull: ["$$c._id", false] } },
                                },
                            },
                        },
                        {
                            $unwind: {
                                path: "$storeName",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$address",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$storeLogo",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$storeBanner",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        ]).exec(function (err, bookmark) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!bookmark) {
                                    reject(new NotFoundError("Bookmark not found"));
                                } else {
                                    resolve(bookmark);
                                }
                            }
                        })
                });
            })
            .then((bookmark) => {
                for(var i=0;i<bookmark.length;i++){
                    bookmark[i].isBookmarked = true
                    // bookmark[i].save()
                }
                callback.onSuccess(bookmark);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllBookmarks(user, req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            BookmarkModel.find({}).populate({ path: 'storeId', select: ['_id', 'storeName', 'storeLogo', 'storeBanner', 'address', 'featureCatalog', 'avgRating', 'storeDiscription'], model: 'Store' }).exec(function (err, bookmark) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!bookmark) {
                        reject(new NotFoundError("Bookmark not found"));
                    } else {
                        resolve(bookmark);
                    }
                }
            })
        })
        .then((bookmark) => {
            for(var i=0;i<bookmark.length;i++){
                bookmark[i].isBookmarked = (user.id==bookmark[i].userId)
                bookmark[i].save()
            }
            callback.onSuccess(bookmark);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }
}

module.exports = BookmarkHandler;
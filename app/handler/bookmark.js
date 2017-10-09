/**
 * Created by crosp on 5/13/17.
 */
const BookmarkModel = require(APP_MODEL_PATH + 'bookmark').BookmarkModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class BookmarkHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewBookmark(req, callback) {
        let data = req.body;
        let validator = this._validator;
        console.log(req.body)
        req.getValidationResult()
            .then(function(result) {
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
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    BookmarkModel.findOne({ _id: req.params.id }, function(err, bookmark) {
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
        req.checkBody(BookmarkHandler.BOOKMARK_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function(resolve, reject) {
                    BookmarkModel.findOne({ _id: req.params.id }, function(err, bookmark) {
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

    getSingleBookmark(req, callback) {
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
                    BookmarkModel.findOne({ _id: req.params.id }).populate({ path: 'storeId', select: ['storeName', 'storeLogo'],  model: 'Store'  }).exec(function(err, bookmark) {
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
                console.log("book",bookmark)
                callback.onSuccess(bookmark);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    getUserBookmark(req, callback) {
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
                BookmarkModel.find({ userId: req.params.id }).populate({ path: 'storeId', select: ['storeName', 'storeLogo'],  model: 'Store' }).exec(function(err, bookmark) {
                    
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
            callback.onSuccess(bookmark);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllBookmarks(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                BookmarkModel.find({}, function(err, bookmark) {
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
                callback.onSuccess(bookmark);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = BookmarkHandler;
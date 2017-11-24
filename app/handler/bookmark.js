/**
 * Created by crosp on 5/13/17.
 */
const BookmarkModel = require(APP_MODEL_PATH + 'bookmark').BookmarkModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class BookmarkHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }
 /**
 * @swagger
 * /bookmarks:
 *   get:
 *     tags:
 *       - Bookmark
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
 * /bookmarks/{bookmarkId}:
 *   get:
 *     tags:
 *       - Bookmark
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: bookmarkId
 *         description: bookmarkId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */

 /**
 * @swagger
 * /bookmarks/user/{userId}:
 *   get:
 *     tags:
 *       - Bookmark
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
 * /bookmarks:
 *   post:
 *     tags:
 *       - Bookmark
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
 *         type: string
 *       - name: storeId
 *         description: storeId
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
 * /bookmarks/{bookmarkId}:
 *   delete:
 *     tags:
 *       - Bookmark
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
 *       - name: bookmarkId
 *         description: bookmarkId
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /bookmakrs/{bookmarkId}:
 *   put:
 *     tags:
 *       - Blog
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         type: string
 *       - name: bookmarkId
 *         description: bookmarkId
 *         in: path
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: body
 *         type: string
 *       - name: storeId
 *         description: storeId
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
 * definition:
 *   UpdateActivitiesObj:
 *     properties:
 *       userId:
 *         type: string
 *         required: true
 *       storeId:
 *         type: string
 *         required: true
 */

    createNewBookmark(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody('userId', 'Invalid userId provided').isMongoId();
        req.checkBody('userId', 'userId is required').notEmpty();
        req.checkBody('storeId', 'storeId is required').notEmpty();
        req.checkBody('storeId', 'Invalid storeId provided').isMongoId();
        
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
                StoreModel.findOne({ _id: req.body.storeId }, function(err, store) {
                    if (err !== null) {
                        new NotFoundError("store not found");
                    } else {
                        if (!store) {
                            new NotFoundError("store not found");
                        } else {
                            store.bookmarkCount = store.bookmarkCount + 1;
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
                StoreModel.findOne({ _id: req.body.storeId }, function(err, store) {
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
                    BookmarkModel.findOne({ _id: req.params.id }).populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner'],  model: 'Store'  }).exec(function(err, bookmark) {
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
                BookmarkModel.find({ userId: req.params.id }).populate({ path: 'storeId', select: ['_id','storeName', 'storeLogo', 'storeBanner','address','featureCatalog','avgRating','storeDiscription'],  model: 'Store' }).exec(function(err, bookmark) {
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
            BookmarkModel.find({}).populate({ path: 'storeId', select: ['_id','storeName', 'storeLogo', 'storeBanner','address','featureCatalog','avgRating','storeDiscription'],  model: 'Store' }).exec(function(err, bookmark) {
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
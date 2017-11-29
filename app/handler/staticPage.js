const StaticPageModel = require(APP_MODEL_PATH + 'staticPage').StaticPageModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
/**
 * @swagger
 * /staticPages:
 *   post:
 *     tags:
 *       - StaticPage
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
 *       - name: title
 *         description: title
 *         in: body
 *         required: true
 *         type: string
 *       - name: content
 *         description: content
 *         in: body
 *         required: true
 *         type: string
 *       - name: type
 *         description: type ("service" or "privacy")
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /staticPages/{staticPageId}:
 *   put:
 *     tags:
 *       - StaticPage
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
 *       - name: staticPageId
 *         description: staticPageId
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: title
 *         in: body
 *         type: string
 *       - name: content
 *         description: content
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
 * /staticPages/{staticPageId}:
 *   delete:
 *     tags:
 *       - StaticPage
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: staticPageId
 *         description: staticPageId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /staticPages/type/{type}:
 *   get:
 *     tags:
 *       - StaticPage
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: basic authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: type
 *         description: type ("service" or "privacy")
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /staticPages:
 *   get:
 *     tags:
 *       - StaticPage
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
 * definition:
 *   UpdateActivitiesObj:
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       type:
 *         type: string
 */
class StaticPageHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get SERVICE_VALIDATION_SCHEME() {
        return {
            'title': {
                isLength: {
                    options: [{ min: 2  }],
                    errorMessage: 'Comment must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'title is required'
            },
            'content': {
                isLength: {
                    options: [{ min: 50  }],
                    errorMessage: 'content must be 50 characters long'
                },
                notEmpty: false,
                errorMessage: 'content is required'
            },
        };
    }

    createNewStaticPage(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};        
        req.checkBody(StaticPageHandler.SERVICE_VALIDATION_SCHEME);        
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
            return new StaticPageModel(ModelData);
        })
        .then((staticPage) => {  
            staticPage.save();
            return staticPage;
        })
        .then((saved) => {
            callback.onSuccess(saved);      
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    deleteStaticPage(req, callback) {
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
                StaticPageModel.findOne({ _id: req.params.id }, function(err, staticPage) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!staticPage) {
                            reject(new NotFoundError("staticPage not found"));
                        } else {
                            resolve(staticPage);
                        }
                    }
                })
            });
        })
        .then((staticPage) => {
            staticPage.remove();
            return staticPage;
        })
        .then((saved) => {
            callback.onSuccess({}, "staticPage id " + saved.id + " deleted successfully ");
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    updateStaticPage(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(StaticPageHandler.REVIEWCOMMENT_VALIDATION_SCHEME);
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
                StaticPageModel.findOne({ _id: req.params.id }, function(err, staticPage) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!staticPage) {
                            reject(new NotFoundError("staticPage not found"));
                        } else {
                            resolve(staticPage);
                        }
                    }
                })
            });
        })
        .then((staticPage) => {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    staticPage[key] = data[key];
                }
            }       
            staticPage.save();
            return staticPage;
        })
        .then((saved) => {
            callback.onSuccess(saved);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getSingleStaticPage(req, callback) {
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
                StaticPageModel.findOne({ _id: req.params.id }, function(err, staticPage) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!staticPage) {
                            reject(new NotFoundError("staticPage not found"));
                        } else {
                            resolve(staticPage);
                        }
                    }
                })
            });
        })
        .then((staticPage) => {
            callback.onSuccess(staticPage);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getStaticByType(req, callback) {
        let data = req.body;
        req.getValidationResult()
        .then(function(result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function(resolve, reject) {
                StaticPageModel.find({ type: req.params.type }, function(err, staticPage) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!staticPage) {
                            reject(new NotFoundError(req.params.type + " not found"));
                        } else {
                            resolve(staticPage);
                        }
                    }
                })
            });
        })
        .then((staticPage) => {
            callback.onSuccess(staticPage);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllStaticPages(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            StaticPageModel.find({}, function(err, category) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!category) {
                        reject(new NotFoundError("staticPage not found"));
                    } else {
                        resolve(category);
                    }
                }
            })

        })
        .then((staticPage) => {
            callback.onSuccess(staticPage);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

}

module.exports = StaticPageHandler;
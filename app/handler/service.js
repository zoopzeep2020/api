const ServiceModel = require(APP_MODEL_PATH + 'service').ServiceModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
/**
 * @swagger
 * /services:
 *   post:
 *     tags:
 *       - Service
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
 * /services/{serviceId}:
 *   put:
 *     tags:
 *       - Service
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
 *       - name: serviceId
 *         description: serviceId
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
 * /services/{serviceId}:
 *   delete:
 *     tags:
 *       - Service
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: serviceId
 *         description: serviceId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /services/static/{type}:
 *   get:
 *     tags:
 *       - Service
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
 * /services:
 *   get:
 *     tags:
 *       - Service
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
class ServiceHandler extends BaseAutoBindedClass {
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

    createNewService(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};        
        req.checkBody(ServiceHandler.SERVICE_VALIDATION_SCHEME);        
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
            return new ServiceModel(ModelData);
        })
        .then((service) => {      
            service.save();
            return service;
        })
        .then((saved) => {
            callback.onSuccess(saved);      
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    deleteService(req, callback) {
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
                ServiceModel.findOne({ _id: req.params.id }, function(err, service) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!service) {
                            reject(new NotFoundError("service not found"));
                        } else {
                            resolve(service);
                        }
                    }
                })
            });
        })
        .then((service) => {
            service.remove();
            return service;
        })
        .then((saved) => {
            callback.onSuccess({}, "service id " + saved.id + " deleted successfully ");
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    updateService(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(ServiceHandler.REVIEWCOMMENT_VALIDATION_SCHEME);
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
                ServiceModel.findOne({ _id: req.params.id }, function(err, service) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!service) {
                            reject(new NotFoundError("service not found"));
                        } else {
                            resolve(service);
                        }
                    }
                })
            });
        })
        .then((service) => {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    service[key] = data[key];
                }
            }       
            service.save();
            return service;
        })
        .then((saved) => {
            callback.onSuccess(saved);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getSingleService(req, callback) {
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
                ServiceModel.findOne({ _id: req.params.id }, function(err, service) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!service) {
                            reject(new NotFoundError("service not found"));
                        } else {
                            resolve(service);
                        }
                    }
                })
            });
        })
        .then((service) => {
            callback.onSuccess(service);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getStaticByType(req, callback) {
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
                ServiceModel.find({ type: req.params.type }, function(err, service) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!service) {
                            reject(new NotFoundError(req.params.type + " not found"));
                        } else {
                            resolve(service);
                        }
                    }
                })
            });
        })
        .then((service) => {
            callback.onSuccess(service);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllServices(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            ServiceModel.find({}, function(err, category) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!category) {
                        reject(new NotFoundError("service not found"));
                    } else {
                        resolve(category);
                    }
                }
            })

        })
        .then((service) => {
            callback.onSuccess(service);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

}

module.exports = ServiceHandler;
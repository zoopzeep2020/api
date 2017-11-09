const PolicyModel = require(APP_MODEL_PATH + 'policy').PolicyModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
/**
 * @swagger
 * /policies:
 *   post:
 *     tags:
 *       - Policy
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
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /policies/{policyId}:
 *   put:
 *     tags:
 *       - Policy
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
 *       - name: policyId
 *         description: policyId
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
 * /policies/{policyId}:
 *   delete:
 *     tags:
 *       - Policy
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: policyId
 *         description: policyId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /policies/{policyId}:
 *   get:
 *     tags:
 *       - Policy
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: policyId
 *         description: policyId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /policies:
 *   get:
 *     tags:
 *       - Policy
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
 */
class PolicyHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get POLICY_VALIDATION_SCHEME() {
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

    createNewPolicy(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let ModelData = {};        
        req.checkBody(PolicyHandler.POLICY_VALIDATION_SCHEME);        
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
            return new PolicyModel(ModelData);
        })
        .then((policy) => {      
            policy.save();
            return policy;
        })
        .then((saved) => {
            callback.onSuccess(saved);      
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    deletePolicy(req, callback) {
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
                PolicyModel.findOne({ _id: req.params.id }, function(err, policy) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!policy) {
                            reject(new NotFoundError("policy not found"));
                        } else {
                            resolve(policy);
                        }
                    }
                })
            });
        })
        .then((policy) => {
            policy.remove();
            return policy;
        })
        .then((saved) => {
            callback.onSuccess({}, "policy id " + saved.id + " deleted successfully ");
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    updatePolicy(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(PolicyHandler.REVIEWCOMMENT_VALIDATION_SCHEME);
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
                PolicyModel.findOne({ _id: req.params.id }, function(err, policy) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!policy) {
                            reject(new NotFoundError("policy not found"));
                        } else {
                            resolve(policy);
                        }
                    }
                })
            });
        })
        .then((policy) => {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    policy[key] = data[key];
                }
            }       
            policy.save();
            return policy;
        })
        .then((saved) => {
            callback.onSuccess(saved);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getSinglePolicy(req, callback) {
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
                PolicyModel.findOne({ _id: req.params.id }, function(err, policy) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!policy) {
                            reject(new NotFoundError("policy not found"));
                        } else {
                            resolve(policy);
                        }
                    }
                })
            });
        })
        .then((policy) => {
            callback.onSuccess(policy);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllPolicys(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
            PolicyModel.find({}, function(err, category) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (!category) {
                        reject(new NotFoundError("policy not found"));
                    } else {
                        resolve(category);
                    }
                }
            })

        })
        .then((policy) => {
            callback.onSuccess(policy);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

}

module.exports = PolicyHandler;
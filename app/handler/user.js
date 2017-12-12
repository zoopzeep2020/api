/**
 * Created by WebrexStudio on 5/9/17.
 */
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const AdminModel = require(APP_MODEL_PATH + 'admin').AdminModel;
const StoreHandler = require(APP_HANDLER_PATH + 'store');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const UnauthorizedError = require(APP_ERROR_PATH + 'unauthorized');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
let crypto = require('crypto');
var path = require('path');
const mongoose = require('mongoose');

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - User
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
 *       - name: name
 *         description: name
 *         in: body
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: path
 *         required: true
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         type: number
 *       - name: userImage
 *         in: formData
 *         description: The uploaded file of userImage
 *         type: file
 *       - name: email
 *         description: email
 *         in: body
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users/claimoffer/{offerId}:
 *   put:
 *     tags:
 *       - User
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
 *       - name: offerId
 *         description: offerId
 *         in: path
 *         required: true
 *         type: string
 *       - name: offerCode
 *         description: offerCode(that you have to generate while creating offer )
 *         in: body
 *         required: true
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User
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
 * /users/admin/adminkey:
 *   get:
 *     tags:
 *       - User
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
 * /users/admin:
 *   post:
 *     tags:
 *       - User
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: adminKey
 *         description: adminKey
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
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
 *       - name: name
 *         description: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         required: true
 *         type: number
 *       - name: email
 *         description: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: isUser
 *         description: isUser
 *         in: body
 *         type: boolean
 *       - name: isStore
 *         description: isStore
 *         in: body
 *         type: boolean
 *     responses:
 *       200:
 *         description: object of activity".
 */

/**
* @swagger
* /users/?{continuewithexistingstore}:
*   post:
*     tags:
*       - User
*     description: create user for email which is already exist as a store
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: basic authorization
*         in: header
*         required: true
*         type: string
*         default: maximumvsminimumsecurity
*       - name: name
*         description: name
*         in: body
*         required: true
*         type: string
*       - name: phone
*         description: phone
*         in: body
*         required: true
*         type: number
*       - name: email
*         description: email
*         in: body
*         required: true
*         type: string
*       - name: password
*         description: password
*         in: body
*         required: true
*         type: string
*       - name: isUser
*         description: isUser
*         in: body
*         type: boolean
*       - name: isStore
*         description: isStore
*         in: body
*         type: boolean
*       - name: continuewithexistingstore
*         description: true if you want to continue and false if not
*         in: body
*         required: true
*         type: boolean
*     responses:
*       200:
*         description: object of activity".
*/
/**
 * @swagger
 * /users/?{continuewithexistinguser}:
 *   post:
 *     tags:
 *       - User
 *     description: create user for email which is already exist as a store
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: basic authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: maximumvsminimumsecurity
 *       - name: name
 *         description: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         required: true
 *         type: number
 *       - name: email
 *         description: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: isUser
 *         description: isUser
 *         in: body
 *         type: boolean
 *       - name: isStore
 *         description: isStore
 *         in: body
 *         type: boolean
 *       - name: continuewithexistinguser
 *         description:  true if you want to continue and false if not
 *         in: body
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
* @swagger
* definition:
*   UpdateActivitiesObj:
*     properties:
*       name:
*         type: string
*       phone:
*         type: string
*       deviceToken:
*         type: string
*       deviceType:
*         type: string
*       userImage:
*         type: string
*       categoriesIds:
*         type: array
*         items:
*          type: string
*       isUser:
*         type: boolean
*       isStore:
*         type: boolean
*       isAdmin:
*         type: boolean
*       storeId:
*         type: string
*       email:
*         type: string
*/
class UserHandler {
    constructor() {
        this._validator = require('validator');
        this._storeHandler = new StoreHandler();
        this._jwtTokenHandler = require('jsonwebtoken');
        this._authManager = require(APP_MANAGER_PATH + 'auth');
    }
    static get USER_VALIDATION_SCHEME() {
        return {
            'name': {
                isLength: {
                    options: [{ min: 2 }],
                    errorMessage: 'Name must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'Name is required'
            },
            'email': {
                isEmail: {
                    errorMessage: 'Email is invalid'
                },
                notEmpty: true,
                errorMessage: "Email is required"

            },
            'password': {
                isLength: {
                    options: [{ min: 8 }],
                    errorMessage: 'Password must be 8 characters long'
                },
                notEmpty: true,
                errorMessage: 'Password is required'
            },
            'phone': {
                isLength: {
                    options: [{ min: 10, max: 10 }],
                    errorMessage: 'Phone is invalid'
                },
                notEmpty: true,
                errorMessage: 'Phone is required'
            }
        };
    }
    static get USER_FB_VALIDATION_SCHEME() {
        return {
            'name': {
                isLength: {
                    options: [{ min: 2 }],
                    errorMessage: 'Name must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'Name is required'
            },
            'email': {
                isEmail: {
                    errorMessage: 'Email is invalid'
                },
                notEmpty: true,
                errorMessage: "Email is required"

            },
            'fbToken': {
                notEmpty: true,
                errorMessage: 'fbToken is required'
            },
            'phone': {
                isLength: {
                    options: [{ min: 10, max: 10 }],
                    errorMessage: 'Phone is invalid'
                },
                notEmpty: true,
                errorMessage: 'Phone is required'
            }
        };
    }

    createNewUser(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let storeHandler = this._storeHandler;
        let request = req;
        if (req.body.fbToken == undefined) {
            req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        } else {
            req.checkBody(UserHandler.USER_FB_VALIDATION_SCHEME);
        }
        req.checkBody('isStore', 'Either isStore is true or isUser is true').isOneTrue(req.body.isStore, req.body.isUser);
        req.checkBody('isUser', 'Either isStore is true or isUser is true').isOneTrue(req.body.isStore, req.body.isUser);
        req.getValidationResult()
            .then(function (result) {
                var errorMessages = {};
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages.join(' && ')); ValidationError(errorMessages);
                }
                return data;
            })
            .then((user) => {
                return new Promise(function (resolve, reject) {
                    UserModel.findOne({ email: user.email }, function (err, docs) {
                        user.userImage = "";
                        // for result found or not 
                        if (docs != null) {
                            // check user already exists
                            if (docs.isStore && docs.isUser) {
                                if (user.isStore) {
                                    reject(new AlreadyExistsError("Store already exists"));
                                } else {
                                    reject(new AlreadyExistsError("User already exists"));
                                }
                            } else {

                                if (user.isStore) {
                                    if (user.isStore && docs.isUser && !docs.isStore && !(req.query.continuewithexistinguser == "true")) {
                                        reject(new AlreadyExistsError("user already exists with this email. Would you like to continue?"));
                                    } else if (!docs.isStore) {
                                        storeHandler.createNewStore(request, {
                                            onSuccess: function (data) {
                                                docs.isStore = true;
                                                docs.storeId = data._id;
                                                resolve(docs);
                                            },
                                            onError: function (data) {
                                                reject(new AlreadyExistsError("Somthing happend wrong"));
                                            },
                                        });
                                    } else {
                                        reject(new AlreadyExistsError("Store already exists"));
                                    }
                                } else {
                                    if (user.isUser && docs.isStore && !docs.isUser && !(req.query.continuewithexistingstore == "true")) {
                                        reject(new AlreadyExistsError("store already exists with this email. Would you like to continue?"));
                                    } else if (!docs.isUser) {
                                        docs.isUser = true;
                                        resolve(docs);
                                    } else {
                                        reject(new AlreadyExistsError("User already exists"));
                                    }
                                }
                            }
                        } else {
                            if (user.isStore) {
                                storeHandler.createNewStore(request, {
                                    onSuccess: function (data) {
                                        user.storeId = data._id;
                                        resolve(new UserModel(user));
                                    },
                                    onError: function (data) {
                                        reject(new AlreadyExistsError("Somthing happend wrong"));
                                    },
                                });
                            } else {
                                let userModel = new UserModel(user);
                                resolve(userModel);
                            }
                        }
                    });
                });
            })
            .then((user) => {
                user.email = user.email.toLowerCase();
                user.save();
                let userToken = this._authManager.signToken("jwt-rs-auth", this._provideTokenPayload(user), this._provideTokenOptions());
                let data = {
                   token: userToken.token,
                    _id: user._id,
                    name: user.name,
                    userId: user.name,
                    email: user.email.toLowerCase(),
                    phone: user.phone,
                    latLong: user.latLong,
                    userImage: user.userImage,
                    deviceToken: user.deviceToken,
                    storeId: { _id: user.storeId },
                    isStore: user.isStore,
                    isUser: user.isUser,
                };
                return data;
            })
            .then((user) => {
                callback.onSuccess(user);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    createNewAdmin(req, user, callback) {
        let data = req.body;
        req.checkBody('adminKey', 'adminKey is required').notEmpty();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return data;
            })
            .then((user) => {
                return new Promise(function (resolve, reject) {
                    var count = AdminModel.count({}, function (err, count) {
                        if (count <= 0) {
                            new AdminModel({
                                adminKey: "zeepzoopadminkey"
                            }).save();
                        }
                    });
                    AdminModel.findOne({ adminKey: req.body.adminKey }, function (err, key) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!key) {
                                reject(new NotFoundError("key not match"));
                            } else {
                                UserModel.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
                                    if (err !== null) {
                                        reject(err);
                                    } else {
                                        if (!user) {
                                            reject(new NotFoundError("User not found"));
                                        } else {

                                            resolve([user, key]);
                                        }
                                    }
                                })
                            }
                        }
                    });
                });
            })
            .then((result) => {
                return new Promise(function (resolve, reject) {
                    crypto.randomBytes(20, function (err, buf, user, key) {
                        var token = buf.toString('hex');
                        if (err) reject(err);
                        resolve([result[0], result[1], token]);
                    });
                });
            }).then((result) => {
                let user = result[0];
                let key = result[1];
                let token = result[2];
                user.isAdmin = true;
                user.save();
                key.adminKey = token;
                key.save();
                let userToken = this._authManager.signToken("jwt-rs-auth", this._provideTokenPayload(user), this._provideTokenOptions());
                let data = {
                    token: userToken.token,
                    name: user.name,
                    email: user.email.toLowerCase(),
                    phone: user.phone,
                    latLong: user.latLong,
                    deviceToken: user.deviceToken,
                    storeId: user.storeId,
                    isStore: user.isStore,
                    isUser: user.isUser,
                    isAdmin: user.isAdmin
                };
                return data;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    claimOffer(req, callback) {
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
                    OfferModel.findOneAndUpdate({ $and: [{ '_id': req.params.id }, { 'offerCode': req.body.offerCode }, { 'claimedOfferBy': { "$ne": mongoose.Types.ObjectId(req.body.userId) } }] },
                        {
                            '$addToSet': { 'claimedOfferBy': mongoose.Types.ObjectId(req.body.userId) },
                        },
                        { 'new': true, 'multi': true },
                        function (err, offer) {
                            if (offer == null) {
                                reject(new NotFoundError("Offercode is not valid or you have already claimed offer"));
                            } else {
                                resolve(offer);
                            }
                        })
                });
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateUser(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (files != undefined && typeof files['userImage'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['userImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['userImage'].path, targetDir + fileName, function (err) {
                            req.body.userImage = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },

            function (data, done) {
                if (req.body.name != undefined) {
                    req.checkBody('name').notEmpty();
                }
                if (req.body.email != undefined) {
                    req.checkBody('email', 'you cannot update email').isEmpty().notEmpty();
                }
                if (req.body.password != undefined) {
                    req.checkBody('password', 'password is too short').checkLength(req.body.password, 8);
                }
                req.getValidationResult()
                    .then(function (result) {
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages.join(' && '));
                        }
                        return new Promise(function (resolve, reject) {
                            UserModel.findOne({ _id: req.params.id }, function (err, user) {
                                if (err !== null) {
                                    reject(err);
                                } else {
                                    if (!user) {
                                        reject(new NotFoundError("user not found"));
                                    } else {
                                        resolve(user);
                                    }
                                }
                            })
                        });
                    })
                    .then((user) => {
                        for (var key in data) {
                            user[key] = data[key];
                        }
                        user.email = user.email.toLowerCase();
                        user.save();
                        return user;
                    })
                    .then((saved) => {
                        callback.onSuccess(saved);
                        const directory = './uploads';
                        fs.readdir(directory, (err, files) => {
                            if (err) throw error;
                            for (const file of files) {
                                fs.unlink(path.join(directory, file), err => {
                                    if (err) throw error;
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        callback.onError(error);
                    });
            }
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    getUserInfo(req, userToken, callback) {
        req.checkParams('id', 'Invalid user id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There have been validation errors: ' + errorMessages.join(' && ')); ValidationError(errorMessages);
                }
                let userId = req.params.id;
                if (userToken.id !== req.params.id && !userToken.isAdmin) {
                    throw new UnauthorizedError("Provided id doesn't match with  the requested user id");
                } else {
                    return new Promise(function (resolve, reject) {
                        UserModel.findById(userId).populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner'] }).exec(function (err, user) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (user === null) {

                                } else {
                                    resolve(user);
                                }
                            }
                        })
                    });
                }
            })
            .then((user) => {
                callback.onSuccess(user);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAdminKey(req, userToken, callback) {
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function (elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    AdminModel.find().exec(function (err, adminKey) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            resolve(adminKey);
                        }
                    })
                });
            })
            .then((adminKey) => {
                callback.onSuccess(adminKey[0]);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    _provideTokenPayload(user) {
        if (user.storeId) {
            return {
                id: user.id,
                storeId: user.storeId,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                isStore: user.isStore,
                email: user.email,
                userImage: user.userImage,
                scope: 'default'
            };
        } else {
            return {
                id: user.id,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                isStore: user.isStore,
                email: user.email,
                userImage: user.userImage,
                scope: 'default'
            };
        }
    }

    _provideTokenOptions() {
        let config = global.config;
        return {
            expiresIn: "10 days",
            audience: config.jwtOptions.audience,
            issuer: config.jwtOptions.issuer,
            algorithm: config.jwtOptions.algorithm
        };
    }

    objectify(array) {
        if (array !== undefined) {
            return array.reduce(function (p, c) {
                p[c['fieldname']] = c;
                return p;
            }, {});
        }
    }
}

module.exports = UserHandler;
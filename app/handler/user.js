/**
 * Created by crosp on 5/9/17.
 */
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const StoreHandler = require(APP_HANDLER_PATH + 'store');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const UnauthorizedError = require(APP_ERROR_PATH + 'unauthorized');

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
                    options: [{ min: 2}],
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
                    options: [{ min: 8}],
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


    

    

    createNewUser(req, callback) {
        let data = req.body;
        let validator = this._validator;
        let storeHandler = this._storeHandler;
        let request = req;
        req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return data;
            })
            .then((user) => {
                return new Promise(function(resolve, reject) {
                    UserModel.findOne({ email: user.email }, function(err, docs) {
                        // for result found or not 
                        if (docs != null) {
                            // check user already exists
                            if (user.isUser != undefined) {
                                if (user.isUser) {
                                    if (docs.isUser) {
                                        reject(new AlreadyExistsError("User already exists"));
                                    } else {
                                        docs.isUser = true;
                                        resolve(docs);
                                    }
                                } else {
                                    reject(new AlreadyExistsError("User already exists"));
                                }       
                            }

                            // check store already exists if not then create new store
                            if (user.isStore != undefined) {
                                if (user.isStore) {
                                    if (docs.isStore) {
                                        reject(new AlreadyExistsError("Store already exists"));
                                    } else {
                                        storeHandler.createNewStore(request, {
                                            onSuccess: function(data) {
                                                docs.isStore = true;
                                                docs.storeId = data._id;
                                                resolve(docs);
                                            },
                                            onError: function(data) {
                                                reject(new AlreadyExistsError("Somthing happend wrong"));
                                            },
                                        });
                                    }
                                } else {
                                    reject(new AlreadyExistsError("Store already exists"));
                                }
                            }

                            if (user.isStore == undefined && user.isUser == undefined) {
                                reject(new AlreadyExistsError("Somthing happend wrong"));
                            }

                        } else {
                            if (user.isStore) {
                                storeHandler.createNewStore(request, {
                                    onSuccess: function(data) {
                                        let userModel = new UserModel({
                                            name: validator.trim(user.name),
                                            email: validator.trim(user.email),
                                            password: validator.trim(user.password),
                                            phone: user.phone,
                                            deviceToken: user.deviceToken,
                                            latLong: user.latLong,
                                            isUser: user.isUser,
                                            isStore: user.isStore,
                                            storeId: data._id
                                        });
                                        resolve(userModel);
                                    },
                                    onError: function(data) {
                                        reject(new AlreadyExistsError("Somthing happend wrong"));
                                    },
                                });
                            } else {
                                let userModel = new UserModel({
                                    name: validator.trim(user.name),
                                    email: validator.trim(user.email),
                                    password: validator.trim(user.password),
                                    phone: user.phone,
                                    deviceToken: user.deviceToken,
                                    latLong: user.latLong,
                                    isUser: user.isUser,
                                    isStore: user.isStore,
                                    storeId: user.storeId
                                });
                                resolve(userModel);
                            }
                        }
                    });
                });
            })
            .then((user) => {
                user.save();
                let userToken = this._authManager.signToken("jwt-rs-auth", this._provideTokenPayload(user), this._provideTokenOptions());
                let data = {
                    token:userToken.token,
                    name:user.name,
                    email:user.email,  
                    phone:user.phone,
                    latLong:user.latLong,
                    deviceToken:user.deviceToken,
                    storeId:user.storeId,
                    isStore:user.isStore,
                    isUser:user.isUser,
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

    updateUser(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
       // req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                return new Promise(function(resolve, reject) {
                    UserModel.findOne({ _id: req.params.id }, function(err, user) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!user) {
                                reject(new NotFoundError("User not found"));
                            } else {
                                resolve(user);
                            }
                        }
                    })
                });
            })
            .then((user) => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        user[key] = data[key];
                    }
                }  
                user.save();
                return user;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getUserInfo(req, userToken, callback) {
        req.checkParams('id', 'Invalid user id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }

                let userId = req.params.id;
                if (userToken.id !== req.params.id) {
                    throw new UnauthorizedError("Provided id doesn't match with  the requested user id")
                } else {
                    return new Promise(function(resolve, reject) {
                        UserModel.findById(userId).populate({ path: 'storeId', select: ['storeName', 'storeLogo', 'storeBanner'] }).exec(function(err, user) {
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

    _provideTokenPayload(user) {
        return {
            id: user.id,
            isAdmin:user.isAdmin,
            scope: 'default'
        };
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

}

module.exports = UserHandler;
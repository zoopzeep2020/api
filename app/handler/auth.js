/**
 * Created by WebrexStudio on 5/9/17.
 */
const RevokedToken = require(APP_MODEL_PATH + 'auth/revoked-token').RevokedTokenModel;
const CityModel = require(APP_MODEL_PATH + 'city').CityModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
let crypto = require('crypto');
var async = require('async');
const utf8 = require('utf8');
const SHA_HASH_LENGTH = 64;
const ForbiddenError = require(APP_ERROR_PATH + 'forbidden');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

class AuthHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._jwtTokenHandler = require('jsonwebtoken');
        this._authManager = require(APP_MANAGER_PATH + 'auth');
    }

    issueNewToken(user, req, callback) {
        let that = this;
        if (user != null && user) {

            user.cityName = "";
        }
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                console.log(req.body);
                for (var key in req.body) {
                    if ((key == 'userLat' || key == 'deviceToken' || key == 'userLong' || key == 'deviceType')) {
                        user[key] = req.body[key];
                    }
                    if (key == 'location') {
                        var longitude = isNaN(parseFloat(req.body.location[0])) ? 0 : parseFloat(req.body.location[0]);
                        var lattitude = isNaN(parseFloat(req.body.location[1])) ? 0 : parseFloat(req.body.location[1]);
                        return new Promise(function (resolve, reject) {
                            CityModel.aggregate(
                                {
                                    "$geoNear": {
                                        "near": {
                                            "type": "Point",
                                            "coordinates": [longitude, lattitude]
                                        },
                                        "distanceField": "distance",
                                        "spherical": true,
                                        "maxDistance": 0
                                    }
                                },
                                { $limit: 1 }
                            ).exec(function (err, results) {
                                user['cityName'] = results[0]['cityName'];
                                resolve(user);
                            })
                        });
                    }
                }
            }).then((results) => {
                if (user) {
                    if (user != null)
                        console.log(user);
                    user.save();
                    let userToken = that._authManager.signToken("jwt-rs-auth", that._provideTokenPayload(user), that._provideTokenOptions());
                    let data = {
                        _id: user._id,
                        token: userToken.token,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        deviceToken: user.deviceToken,
                        userLat: user.userLat,
                        userLong: user.userLong,
                        storeId: user.storeId,
                        isStore: user.isStore,
                        isUser: user.isUser,
                        userImage: user.userImage,
                        deviceType: user.deviceType,
                        isAdmin: user.isAdmin,
                        cityName: user.cityName
                    };
                    callback.onSuccess(data);
                } else {
                    callback.onError(new NotFoundError("User not found"));
                }
            }).catch((error) => {
                callback.onError(error);
            });
    }

    issueNewTokenWithFbToken(req, callback) {
        let that = this;
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    UserModel.findOne({ fbToken: req.body.fbToken }, function (err, user) {
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
            }).then((user) => {
                if (user != null) {
                    user.cityName = ""
                }
                for (var key in req.body) {
                    if ((key == 'userLat' || key == 'deviceToken' || key == 'userLong' || key == 'deviceType')) {
                        user[key] = req.body[key];
                    }
                    if (key == 'location') {
                        var longitude = isNaN(parseFloat(req.body.location[0])) ? 0 : parseFloat(req.body.location[0]);
                        var lattitude = isNaN(parseFloat(req.body.location[1])) ? 0 : parseFloat(req.body.location[1]);
                        return new Promise(function (resolve, reject) {
                            CityModel.aggregate(
                                {
                                    "$geoNear": {
                                        "near": {
                                            "type": "Point",
                                            "coordinates": [longitude, lattitude]
                                        },
                                        "distanceField": "distance",
                                        "spherical": true,
                                        "maxDistance": 0
                                    }
                                },
                                { $limit: 1 }
                            ).exec(function (err, results) {
                                user['cityName'] = results[0]['cityName'];
                                resolve(user);
                            })
                        });
                    }
                }
                return user;
            }).then((user) => {
                if (user) {
                    if (user != null)
                        user.save();
                    let userToken = that._authManager.signToken("jwt-rs-auth", that._provideTokenPayload(user), that._provideTokenOptions());
                    let data = {
                        _id: user._id,
                        token: userToken.token,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        deviceToken: user.deviceToken,
                        userLat: user.userLat,
                        userLong: user.userLong,
                        storeId: user.storeId,
                        isStore: user.isStore,
                        isUser: user.isUser,
                        userImage: user.userImage,
                        deviceType: user.deviceType,
                        isAdmin: user.isAdmin,
                        cityName: user.cityName
                    };
                    callback.onSuccess(data);
                } else {
                    callback.onError(new NotFoundError("User not found"));
                }
            }).catch((error) => {
                callback.onError(error);
            });
    }

    forgotRequest(req, callback) {
        // req.getValidationResult()
        // .then(function(result) {
        //     if (!result.isEmpty()) {
        //         var errorMessages = {};
        //         result.array().map(function(elem) {
        //             return errorMessages[elem.param] = elem.msg;
        //         });
        //         throw new ValidationError(errorMessages);
        //     }
        //     return new Promise(function(resolve, reject) {
        //         UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        //             if (err !== null) {
        //                 reject(err);
        //             } else {
        //                 if (!user) {
        //                     reject(new NotFoundError("Password reset token is invalid or has expired."));
        //                 } else {
        //                     resolve(user);
        //                 }
        //             }
        //         });
        //     });
        // })
        // .then((user) => {
        //     user.password = req.body.password;
        //     user.resetPasswordToken = undefined;
        //     user.resetPasswordExpires = undefined;

        //     user.save();
        //     return user;
        // })
        // .then((saved) => {
        //     callback.onSuccess("Success! Your password has been changed.");
        // })
        // .catch((error) => {
        //     callback.onError(error);
        // });
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                UserModel.findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        return done(new NotFoundError("User is not found"));
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var smtpTransport = nodemailer.createTransport(
                    {
                        host: 'smtp.zoho.com',
                        port: 465,
                        secure: true, // use SSL
                        auth: {
                            user: global.config.constants.userMail,
                            pass: utf8.decode(global.config.constants.password)
                        },
                        //     service: 'Gmail',
                        // //    host : 'smtpout.secureserver.net',
                        // //    port : 465,
                        // //    secureConnection : true,
                        //     auth: {
                        //         user: global.config.constants.userMail,
                        //         pass: utf8.decode(global.config.constants.password) 
                        //     },
                        logger: true
                    });

                smtpTransport.use('compile', hbs({
                    viewPath: 'app/email_templates/forgot_password',
                    extName: '.hbs'

                }))
                smtpTransport
                var mailOptions = {
                    to: user.email,
                    from: '"ZeepZoop" <notification@zeepzoop.com>',
                    subject: 'Password Reset',
                    // text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    //     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    //     'http://www.zeepzoop.com/reset/?token=' + token + '\n\n' +
                    //     'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                    template: 'conemail',
                    context: {
                        username: user.name,
                        token: token,
                    }
                };
                smtpTransport.sendMail(mailOptions, function (err, res) {
                    if (err) return done(new NotFoundError(err));
                    return callback.onSuccess({
                        "response": 'An e-mail has been sent to ' + user.email + ' with further instructions.'
                    });
                });
            }
        ], function (err, result) {
            if (err) return callback.onError(err);
            else return callback.onSuccess(result);
        });
    }

    resetRequest(req, callback) {
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
                    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!user) {
                                reject(new NotFoundError("Password reset token is invalid or has expired."));
                            } else {
                                resolve(user);
                            }
                        }
                    });
                });
            })
            .then((user) => {
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save();
                return user;
            })
            .then((saved) => {
                callback.onSuccess("Success! Your password has been changed.");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    revokeToken(req, token, callback) {
        let that = this;
        req.checkParams('token', 'Invalid token id provided').notEmpty().isAlphanumeric().isLength(SHA_HASH_LENGTH);
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ForbiddenError('Invalid token id :' + errorMessages.join(' && '));
                }
                let tokenHashedId = req.params.token;
                if (that.checkIfHashedTokenMatches(token, tokenHashedId)) {
                    return new RevokedToken({ token: token });
                } else {
                    throw new ForbiddenError('Invalid credentials');
                }
            })
            .then((token) => {
                token.save();
                return token;
            })
            .then((token) => {
                callback.onSuccess("Token has been successfully revoked");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    _hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    checkIfHashedTokenMatches(token, hashed) {
        let hashedValid = this._hashToken(token);
        return hashedValid === hashed;
    }

    _provideTokenPayload(user) {
        if (user.storeId) {
            return {
                id: user.id,
                storeId: user.storeId._id,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                isStore: user.isStore,
                deviceToken: user.deviceToken,
                deviceType: user.deviceType,
                name: user.name,
                userImage: user.userImage,
                email: user.email,
                scope: 'default'
            };
        } else {
            return {
                id: user.id,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                deviceToken: user.deviceToken,
                deviceType: user.deviceType,
                name: user.name,
                isStore: user.isStore,
                userImage: user.userImage,
                email: user.email,
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
    noNaN(n) { return isNaN(parseFloat(n)) ? 0 : n; }
}

module.exports = AuthHandler;
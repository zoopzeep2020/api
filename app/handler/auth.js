/**
 * Created by crosp on 5/9/17.
 */
const RevokedToken = require(APP_MODEL_PATH + 'auth/revoked-token').RevokedTokenModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
let crypto = require('crypto');
var async = require('async');
const utf8 = require('utf8');
const nodemailer = require('nodemailer');
const SHA_HASH_LENGTH = 64;
const ForbiddenError = require(APP_ERROR_PATH + 'forbidden');

class AuthHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._jwtTokenHandler = require('jsonwebtoken');
        this._authManager = require(APP_MANAGER_PATH + 'auth');
    }
    
    issueNewToken(req, user, callback) {
        let that = this;
        if (user) {
            let userToken = that._authManager.signToken("jwt-rs-auth", that._provideTokenPayload(user), that._provideTokenOptions());
            let data = {
                token:userToken.token,
                name:user.name,
                email:user.email,  
                phone:user.phone,
                deviceToken:user.deviceToken,
                latLong:user.latLong,
                storeId:user.storeId,
                isStore:user.isStore,
                isUser:user.isUser,
            };
            callback.onSuccess(data);
        } else {
            callback.onError(new NotFoundError("User not found"));
        }
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
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
              });
            },
            function(token, done) {
                UserModel.findOne({ email: req.body.email }, function(err, user) {
                    if (!user) {
                        return done(new NotFoundError("User is not found"));
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        
                    user.save(function(err) {
                        done(err, token, user);
                    });
              });
            },
            function(token, user, done) {
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

                var mailOptions = {
                    to: user.email,
                    from: '"ZeepZoop" <hello@webrexstudio.com>', 
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/v1/auth/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    if (err) return done(new NotFoundError(err));
                    return callback.onSuccess('An e-mail has been sent to ' + user.email + ' with further instructions.');
                });
            }
          ], function(err, result) {
            if (err) return callback.onError(err);
            else return callback.onSuccess(result);
          });
    }

    resetRequest(req, callback) {
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
                UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
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
                    let errorMessages = result.array().map(function(elem) {
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

module.exports = AuthHandler;
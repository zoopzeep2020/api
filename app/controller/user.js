/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserHandler = require(APP_HANDLER_PATH + 'user');
const util = require("util");

class UserController extends BaseController {
    constructor() {
        super();
        this._authHandler = new UserHandler();
        this._passport = require('passport');
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: function (token, user) {
                that._authHandler.getUserInfo(req, user, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }
    
    getAdminKey(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', {
                onVerified: function (token, user) {
                    if(user.isAdmin){
                        that._authHandler.getAdminKey(req, user, responseManager.getDefaultResponseHandler(res));
                    }else{
                        this._responseManager.respondWithError(res, 404, "access not allow")                        
                    } 
                },
                onFailure: function (error) {
                    responseManager.respondWithError(res, error.status || 401, error.message);
                }
        })(req, res, next);
    }
    create(req, res) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, () => {
            this._authHandler.createNewUser(req, responseManager.getDefaultResponseHandler(res));
        });
    }

    createAdmin(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this.adminAuthenticate(req, res, next, (user) => {
            that._authHandler.createNewAdmin(req, user, responseManager.getDefaultResponseHandler(res));
        });
    }

    update(req, res, next) {    
        this.userAuthenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){  
                this._authHandler.updateUser(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            } 
        });
    }  
   
    userAuthenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }

    authenticate(req, res, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('secret-key-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res);
    }

    adminAuthenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('credentials-auth', function (err, user) {
            if (err) {
                responseManager.respondWithError(res, err.status || 401, err.message || "");
            } else {
                callback(user);
            }
        })(req, res, next);
    }
}

module.exports = UserController;
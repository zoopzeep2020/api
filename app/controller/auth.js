/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const AuthHandler = require(APP_HANDLER_PATH + 'auth');

class AuthController extends BaseController {
    constructor() {
        super();
        this._authHandler = new AuthHandler();
        this._passport = require('passport');
    }

     /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
  
    // Request token by credentials
    create(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this.authenticate(req, res, next, (user) => {
            that._authHandler.issueNewToken(req, user, responseManager.getDefaultResponseHandler(res));
        }); 

    }
    // createWithFacebook(req, res, next) {
    //     let responseManager = this._responseManager;
    //     let that = this;
    //     this.facebookAuthenticate(req, res, next, (user) => {
    //         that._authHandler.issueNewToken(req, user, responseManager.getDefaultResponseHandler(res));
    //     }); 

    // }
    // forget password 
    forgot(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        that._authHandler.forgotRequest(req, responseManager.getDefaultResponseHandler(res));
    }

    // reset password 
    reset(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        that._authHandler.resetRequest(req, responseManager.getDefaultResponseHandler(res));
    }

    // Revoke Token
    remove(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: function (token, user) {
                that._authHandler.revokeToken(req, token, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);

    }

    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('credentials-auth', function (err, user) {
            if (err) {
                responseManager.respondWithError(res, err.status || 401, err.message || "");
            } else {
                callback(user);
            }
        })(req, res, next);
    }
    /* passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));*/
    facebookAuthenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('facebook', function (err, user) {
            if (err) {
                responseManager.respondWithError(res, err.status || 401, err.message || "");
            } else {
                callback(user);
            }
        })(req, res, next);
    }
    basicAuthenticate(req, res, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('secret-key-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res);
    }
}

module.exports = AuthController;
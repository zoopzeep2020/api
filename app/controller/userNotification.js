/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserNotificationHandler = require(APP_HANDLER_PATH + 'userNotification');
class UserNotificationController extends BaseController {
    constructor() {
        super();
        this._userNotificationHandler = new UserNotificationHandler();
        this._passport = require('passport');
    }

    getUserNotification(req, res, next) {
        if (req.headers['authorization']=="maximumvsminimumsecurity") {
            this.basicAuthenticate(req, res, () => {
                this._userNotificationHandler.getUserNotification("userisnotdefined", req, this._responseManager.getDefaultResponseHandler(res));
            });
        } else {
            this.authenticate(req, res, next, (token, user) => {
                this._userNotificationHandler.getUserNotification(user, req, this._responseManager.getDefaultResponseHandler(res));
            });
        }
    }
    
    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
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

module.exports = UserNotificationController;
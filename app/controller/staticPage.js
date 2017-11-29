/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const StaticPageHandler = require(APP_HANDLER_PATH + 'staticPage');
class StaticPageController extends BaseController {
    constructor() {
        super();
        this._staticPageHandler = new StaticPageHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._staticPageHandler.getAllStaticPages(req, this._responseManager.getDefaultResponseHandler(res));   
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
                this._staticPageHandler.getSingleStaticPage(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                }))); 
        });
    }

    getStaticByType(req, res, next) {
        let responseManager = this._responseManager;
        this.basicAuthenticate(req, res, () => {
                this._staticPageHandler.getStaticByType(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                }))); 
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || user.isUser){
                this._staticPageHandler.createNewStaticPage(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._staticPageHandler.updateStaticPage(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._staticPageHandler.deleteStaticPage(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error) {
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

module.exports = StaticPageController;
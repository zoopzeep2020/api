/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const MylistHandler = require(APP_HANDLER_PATH + 'mylist');
class MylistController extends BaseController {
    constructor() {
        super();
        this._mylistHandler = new MylistHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._mylistHandler.getAllMylists(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._mylistHandler.getSingleMylist(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }
    getUserMylist(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.params.id)){
                this._mylistHandler.getUserMylist(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                })));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available");
            }
        });
    }
    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._mylistHandler.createNewMylist(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._mylistHandler.updateMylist(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._mylistHandler.deleteMylist(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
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
}

module.exports = MylistController;
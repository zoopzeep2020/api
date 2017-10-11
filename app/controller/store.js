/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const StoreHandler = require(APP_HANDLER_PATH + 'store');
class StoreController extends BaseController {
    constructor() {
        super();
        this._storeHandler = new StoreHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){  
                this._storeHandler.getAllStores(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            } 
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._storeHandler.getSingleStore(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }
    
    getTrendingStore(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._storeHandler.getTrendingStore(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            console.log(user);
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId && user.storeId == req.params.id)){  
                this._storeHandler.updateStore(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.params.id)){  
                this._storeHandler.deleteStore(req, this._responseManager.getDefaultResponseHandler(res));            
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
}

module.exports = StoreController;
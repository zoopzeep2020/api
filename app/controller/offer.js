/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const OfferHandler = require(APP_HANDLER_PATH + 'offer');
class OfferController extends BaseController {
    constructor() {
        super();
        this._offerHandler = new OfferHandler();
        this._passport = require('passport');
    }
 
    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._offerHandler.getAllOffers(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._offerHandler.getSingleOffer(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });     
    }

    getOfferBySearch(req, res, next) {
        let responseManager = this._responseManager;
        this.basicAuthenticate(req, res, () => {
            this._offerHandler.getOfferBySearch(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    getStoreOffer(req, res, next) {
        let responseManager = this._responseManager;
        this.basicAuthenticate(req, res, () => {
            this._offerHandler.getStoreOffer(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId)){
                this._offerHandler.createNewOffer(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId)){
                this._offerHandler.updateOffer(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId)){
                this._offerHandler.deleteOffer(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = OfferController;
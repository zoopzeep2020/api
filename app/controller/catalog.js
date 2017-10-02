/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const CatalogHandler = require(APP_HANDLER_PATH + 'catalog');
class CatalogController extends BaseController {
    constructor() {
        super();
        this._catalogHandler = new CatalogHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._catalogHandler.getAllCatalogs(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            console.log(user);
            if(user.isAdmin){
                this._catalogHandler.getSingleCatalog(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                })));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            }   
            console.log(user.isAdmin);
        });     
    }

    getStoreCatalog(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._catalogHandler.getCatalogByStoreId(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            console.log(user);
            if((user.isStore || user.isAdmin) && user.storeId === req.body.storeId){
                this._catalogHandler.createNewCatalog(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            }  
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._catalogHandler.updateCatalog(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._catalogHandler.deleteCatalog(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = CatalogController;
/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const CityHandler = require(APP_HANDLER_PATH + 'city');
class CityController extends BaseController {
    constructor() {
        super();
        this._cityHandler = new CityHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.basicAuthenticate(req, res, () => {
            this._cityHandler.getAllCitys(req, this._responseManager.getDefaultResponseHandler(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._cityHandler.getSingleCity(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));

        });
    }

    getSearchByWord(req, res, next) {
        let responseManager = this._responseManager;
        this.basicAuthenticate(req, res, () => {
            this._cityHandler.getSearchByWord(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));

        });
    }

    getSearchByLongLat(req, res, next) {
        let responseManager = this._responseManager;
        this.basicAuthenticate(req, res, () => {
            this._cityHandler.getSearchByLongLat(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if (user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && (user.id == req.body.storeId))) {
                this._cityHandler.createNewCity(req, this._responseManager.getDefaultResponseHandler(res));
            } else {
                this._responseManager.respondWithError(res, 404, "access not available")
            }
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if (user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)) {
                this._cityHandler.updateCity(req, this._responseManager.getDefaultResponseHandler(res));
            } else {
                this._responseManager.respondWithError(res, 404, "access not available")
            }
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            
            if (user.isAdmin || (user.isUser && (user.id == req.body.userId)) || (user.isStore && (user.id == req.body.storeId))) {
                this._cityHandler.deleteCity(user, req, this._responseManager.getDefaultResponseHandler(res));
            } else {
                this._responseManager.respondWithError(res, 404, "access not available")
            }
        });
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

module.exports = CityController;
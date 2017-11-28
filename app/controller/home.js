/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const HomeHandler = require(APP_HANDLER_PATH + 'home');
class HomeController extends BaseController {
    constructor() {
        super();
        this._homeHandler = new HomeHandler();
        this._passport = require('passport');
    }
    get(req, res, next) {
        let responseManager = this._responseManager;
        this._homeHandler.getHome(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
            let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
            responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
        })));
    }

    // create(req, res, next) {
    //     this.authenticate(req, res, next, (token, user) => {
    //         if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
    //             this._homeHandler.createNewHome(req, this._responseManager.getDefaultResponseHandler(res));
    //         }else{
    //             this._responseManager.respondWithError(res, 404, "access not available")                        
    //         } 
    //     });
    // }

    // update(req, res, next) {
    //     this.authenticate(req, res, next, (token, user) => {
    //         if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
    //             this._homeHandler.updateHome(req, this._responseManager.getDefaultResponseHandler(res));
    //         }else{
    //             this._responseManager.respondWithError(res, 404, "access not available")                        
    //         } 
    //     });
    // }

    // remove(req, res, next) {
    //     this.authenticate(req, res, next, (token, user) => {
    //         if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
    //             this._homeHandler.deleteHome(user, req, this._responseManager.getDefaultResponseHandler(res));
    //         }else{
    //             this._responseManager.respondWithError(res, 404, "access not available")                        
    //         } 
    //     });
    // }

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

module.exports = HomeController;
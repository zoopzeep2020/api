/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const ReviewHandler = require(APP_HANDLER_PATH + 'review');
class ReviewController extends BaseController {
    constructor() {
        super();
        this._reviewHandler = new ReviewHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){         
                this._reviewHandler.getAllReviews(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            }
        });
    }

    getStoreReviews(req, res, next) {
        this.basicAuthenticate(req, res, () => {
            this._reviewHandler.getAllStoreReviews(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    getUserReviews(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._reviewHandler.getAllUserReviews(req, this._responseManager.getDefaultResponseHandler(res));   
        });
    }


    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._reviewHandler.getSingleReview(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });     
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._reviewHandler.createNewReview(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._reviewHandler.updateReview(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            }
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || user.isUser){
                this._reviewHandler.deleteReview(user, req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = ReviewController;
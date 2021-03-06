/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const FeedbackHandler = require(APP_HANDLER_PATH + 'feedback');
class FeedbackController extends BaseController {
    constructor() {
        super();
        this._feedbackHandler = new FeedbackHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next){
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
            this._feedbackHandler.getAllFeedbacks(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
                this._feedbackHandler.getSingleFeedback(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                })));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
                this._feedbackHandler.createNewFeedback(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
                this._feedbackHandler.updateFeedback(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)){
                this._feedbackHandler.deleteFeedback(user, req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = FeedbackController;
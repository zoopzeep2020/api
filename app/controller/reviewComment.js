/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const ReviewCommentHandler = require(APP_HANDLER_PATH + 'reviewComment');
class ReviewCommentController extends BaseController {
    constructor() {
        super();
        this._reviewCommentHandler = new ReviewCommentHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._reviewCommentHandler.getAllReviewComments(req, this._responseManager.getDefaultResponseHandler(res));            
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            }
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
                this._reviewCommentHandler.getSingleReviewComment(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                }))); 
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId) || (user.isUser && user.id == req.body.userId)){
                this._reviewCommentHandler.createNewReviewComment(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isStore && user.storeId == req.body.storeId) || (user.isUser && user.id == req.body.userId)){
                this._reviewCommentHandler.updateReviewComment(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || user.isStore || user.isUser){
                this._reviewCommentHandler.deleteReviewComment(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = ReviewCommentController;
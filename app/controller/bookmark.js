/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const BookmarkHandler = require(APP_HANDLER_PATH + 'bookmark');
class BookmarkController extends BaseController {
    constructor() {
        super();
        this._bookmarkHandler = new BookmarkHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._bookmarkHandler.getAllBookmarks(user, req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._bookmarkHandler.getSingleBookmark(user, req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }
    
    getUserBookmark(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.params.id)){                
                this._bookmarkHandler.getUserBookmark(user, req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
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
            if(user.isAdmin || (user.isUser &&  (user.id == req.body.userId))){
                this._bookmarkHandler.createNewBookmark(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(user, res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && (user.id == req.body.userId))){
                this._bookmarkHandler.updateBookmark(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(user, res, 404, "access not available")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._bookmarkHandler.deleteBookmark(user, req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = BookmarkController;
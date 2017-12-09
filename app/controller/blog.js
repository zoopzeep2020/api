/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const BlogHandler = require(APP_HANDLER_PATH + 'blog');
class BlogController extends BaseController {
    constructor() {
        super();
        this._blogHandler = new BlogHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next){
        this.authenticate(req, res, next, (token, user) => {
            this._blogHandler.getAllBlogs(user, req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    getAllWithoutLogin(req, res, next){
        this.basicAuthenticate(req, res, () => {
            this._blogHandler.getAllWithoutLogin( req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    getTrendingBlog(req, res, next){
        this.basicAuthenticate(req, res, () => {
            this._blogHandler.getTrendingBlog( req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    getBlogBySearch(req, res, next){
        this.basicAuthenticate(req, res, () => {
            this._blogHandler.getBlogBySearch( req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    getBlogByUrl(req, res, next){
        this.basicAuthenticate(req, res, () => {
            this._blogHandler.getBlogByUrl( req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
            this._blogHandler.getSingleBlog(user, req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
            })));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._blogHandler.createNewBlog(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._blogHandler.updateBlog(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }
    
    likeBlog(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._blogHandler.likeBlog(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    saveBlog(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._blogHandler.saveBlog(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not available")                        
            } 
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin || (user.isUser && user.id == req.body.userId)){
                this._blogHandler.deleteBlog(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = BlogController;
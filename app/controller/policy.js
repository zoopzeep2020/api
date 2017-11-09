/**
 * Created by crosp on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const PolicyHandler = require(APP_HANDLER_PATH + 'policy');
class PolicyController extends BaseController {
    constructor() {
        super();
        this._policyHandler = new PolicyHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._policyHandler.getAllPolicys(req, this._responseManager.getDefaultResponseHandler(res));   
        });
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (token, user) => {
                this._policyHandler.getSinglePolicy(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
                    let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
                    responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
                }))); 
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._policyHandler.createNewPolicy(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._policyHandler.updatePolicy(req, this._responseManager.getDefaultResponseHandler(res));
            }else{
                this._responseManager.respondWithError(res, 404, "access not allow")                        
            }
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if(user.isAdmin){
                this._policyHandler.deletePolicy(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = PolicyController;
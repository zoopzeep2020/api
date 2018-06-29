
/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const ImageUploadHandler = require(APP_HANDLER_PATH + 'imageUpload');
class ImageUploadController extends BaseController {
    constructor() {
        super();
        this._imageUploadHandler = new ImageUploadHandler();
        this._passport = require('passport');
    }


    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            if (user.isAdmin || (user.isUser && user.id == req.body.userId) || (user.isStore && user.id == req.body.storeId)) {
                this._imageUploadHandler.createNewImageUpload(req, this._responseManager.getDefaultResponseHandler(res));
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
}

module.exports = ImageUploadController;
/**
 * Created by WebrexStudio on 5/9/17.
 */
const BaseController = require(APP_CONTROLLER_PATH + 'base');
const ImageHandler = require(APP_HANDLER_PATH + 'image');
class ImageController extends BaseController {
    constructor() {
        super();
        this._imageHandler = new ImageHandler();
        this._passport = require('passport');
    }

    get(req, res, next) {
        this._imageHandler.getImage(req, res);

        // let responseManager = this._responseManager;
        // this.basicAuthenticate(req, res, () => {
        //     this._imageHandler.getImage(req, responseManager.getDefaultResponseHandlerError(res, ((data, message, code) => {
        //         let hateosLinks = [responseManager.generateHATEOASLink(req.baseUrl, "GET", "collection")];
        //         responseManager.respondWithSuccess(res, code || responseManager.HTTP_STATUS.OK, data, message, hateosLinks);
        //     })));
        // });
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

module.exports = ImageController;
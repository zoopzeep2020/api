/**
 * Created by WebrexStudio on 5/13/17.
 */
/**
 * Created by WebrexStudio on 5/9/17.
 */
const ValidationError = require(APP_ERROR_PATH + 'validation');
const InvalidPayloadError = require(APP_ERROR_PATH + 'invalid-payload');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class ImageUploadHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewImageUpload(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function (done, err) {
                if (typeof files['image'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['image'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['image'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.image = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = {
                        err: true
                    }
                    done(err, data);
                }
            },
            function (data, done) {
                if (data.err) {
                    callback.onError("data undefine");
                } else {
                    callback.onSuccess(data);
                    const directory = './uploads';
                    fs.readdir(directory, (err, files) => {
                        if (err) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), err => {
                                if (err) throw error;
                            });
                        }
                    });
                }
            }
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }

}

module.exports = ImageUploadHandler;
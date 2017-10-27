/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const FeedbackModel = require(APP_MODEL_PATH + 'feedback').FeedbackModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const InvalidPayloadError = require(APP_ERROR_PATH + 'invalid-payload');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const async = require('async');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

class FeedbackHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get FEEDBACK_VALIDATION_SCHEME() {
        return {
            'title': {
                notEmpty: true,
                isLength: {
                    options: [{ min: 2  }],
                    errorMessage: 'title title must be 2 characters long'
                },
                errorMessage: 'title is required'
            },
            'description': {
                notEmpty: true,
                isLength: {
                    options: [{ min: 50  }],
                    errorMessage: 'description must be 50 characters long'
                },
                errorMessage: 'description is required'
            },
        };
    }


   
    createNewFeedback(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['feedbackImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['feedbackImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['feedbackImage'].path, targetDir + fileName, function(err) {
                            req.body.feedbackImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done, err) {
                if(typeof files['feedbackActiveImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['feedbackActiveImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['feedbackActiveImage'].path, targetDir + fileName, function(err) {
                            req.body.feedbackActiveImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done){
                req.checkBody(FeedbackHandler.FEEDBACK_VALIDATION_SCHEME);
                if(req.body.feedbackImage != undefined){
                    req.checkBody('feedbackImage', 'feedbackImage is required').isImage(req.body.feedbackImage);
                }else{
                    req.checkBody('feedbackImage', 'feedbackImage is required').notEmpty();
                }

                if(req.body.feedbackActiveImage != undefined){
                    req.checkBody('feedbackActiveImage', 'feedbackActiveImage is required').isImage(req.body.feedbackActiveImage);
                }else{
                    req.checkBody('feedbackActiveImage', 'feedbackActiveImage  is required').notEmpty();
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new FeedbackModel(data);
                })
                .then((feedback) => {
                    feedback.save();
                    return feedback;
                })
                .then((saved) => {
                    callback.onSuccess(saved);      
                    const directory = './uploads';
                    fs.readdir(directory, (err, files) => {
                        if (err) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), err => {
                                if (err) throw error;
                            });
                        }
                    });             
                })
                .catch((error) => {
                    callback.onError(error);
                });
            }
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });
    }

    

    deleteFeedback(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    FeedbackModel.findOne({ _id: req.params.id }, function(err, feedback) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!feedback) {
                                reject(new NotFoundError("Feedback not found"));
                            } else {
                                resolve(feedback);
                            }
                        }
                    })
                });
            })
            .then((feedback) => {
                feedback.remove();
                return feedback;
            })
            .then((saved) => {
                callback.onSuccess({}, "Feedback id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    updateFeedback(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);        
        async.waterfall([
            function(done, err) {
                if(typeof files['feedbackImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['feedbackImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['feedbackImage'].path, targetDir + fileName, function(err) {
                            req.body.feedbackImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done, err) {
                if(typeof files['feedbackActiveImage'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['feedbackActiveImage'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['feedbackActiveImage'].path, targetDir + fileName, function(err) {
                            req.body.feedbackActiveImage = targetDir + fileName;
                            let data = req.body;   
                            done(err, data);   
                        });
                    });
                }else{
                    let data = req.body;        
                    done(err, data);
                }
            },
            function(data, done){
                if(req.body.feedback != undefined){
                    req.checkBody('feedback', 'feedback is required').notEmpty();
                }
                if(req.body.feedbackImage != undefined){
                    req.checkBody('feedbackImage', 'feedbackImage is required').isImage(req.body.feedbackImage);
                }

                if(req.body.feedbackActiveImage != undefined){
                    req.checkBody('feedbackActiveImage', 'feedbackActiveImage is required').isImage(req.body.feedbackActiveImage);
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        FeedbackModel.findOne({ _id: req.params.id }, function(err, feedback) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!feedback) {
                                    reject(new NotFoundError("feedback not found"));
                                } else {
                                    resolve(feedback);
                                }
                            }
                        })
                    });
                })
                .then((feedback) => {
                    for (var key in data) {
                        feedback[key] = data[key];
                    }   
                    feedback.save();
                    return feedback;
                })
                .then((saved) => {
                    callback.onSuccess(saved);      
                    const directory = './uploads';
                    fs.readdir(directory, (err, files) => {
                        if (err) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), err => {
                                if (err) throw error;
                            });
                        }
                    });             
                })
                .catch((error) => {
                    callback.onError(error);
                });
            }
          ], function(err, data) {
                if (err) return callback.onError(err);
                else return data;
        });        
    }
    
    getSingleFeedback(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function(elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new Promise(function(resolve, reject) {
                    FeedbackModel.findOne({ _id: req.params.id }, function(err, feedback) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!feedback) {
                                reject(new NotFoundError("Feedback not found"));
                            } else {
                                resolve(feedback);
                            }
                        }
                    })
                });
            })
            .then((feedback) => {
                callback.onSuccess(feedback);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCategories(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                FeedbackModel.find({}, function(err, posts) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve(posts);
                    }
                });
            })
            .then((posts) => {
                callback.onSuccess(posts);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    objectify(array) {
        return array.reduce(function(p, c) {
             p[c['fieldname']] = c;
             return p;
        }, {});
    }
}

module.exports = FeedbackHandler;
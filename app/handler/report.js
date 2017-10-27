/**
 * Created by crosp on 5/13/17.
 */
const ReportModel = require(APP_MODEL_PATH + 'report').ReportModel;
const ReviewModel = require(APP_MODEL_PATH + 'review').ReviewModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

class ReportHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }


    static get REPORT_VALIDATION_SCHEME() {
        return {
            'description': {
                isLength: {
                    options: [{ min: 10  }],
                    errorMessage: 'description title must be 2 characters long'
                },
                notEmpty: false,
                errorMessage: 'description required'
            },
        };
    }

    createNewReport(req, callback) {
        let data = req.body;
        console.log(data)
        let validator = this._validator;
        let ModelData = {};
        req.checkBody(ReportHandler.REPORT_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        ModelData[key] = data[key];
                    }
                } 
                return new ReportModel(ModelData);
            })
            .then((report) => {
                report.save();
                return report;
            })
            .then((saved) => {
                ReviewModel.findOne({ _id: req.body.reviewId }, function(err, review) {
                    if (err !== null) {
                        new NotFoundError("review not found");
                    } else {
                        if (!review) {
                            new NotFoundError("review not found");
                        } 
                    }
                }) 
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    deleteReport(user, req, callback) {
        let data = req.body;
        console.log(req)
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
                    ReportModel.findOne({ _id: req.params.id }, function(err, report) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!report) {
                                reject(new NotFoundError("Report not found"));
                            } else {
                                if(user.isAdmin || (report.userId === user.userId)){
                                    resolve(report);
                                }else{
                                    reject(new NotFoundError("you are not allow to remove this report"));
                                }
                            }
                        }
                    })
                });
            })
            .then((report) => {
                report.remove();
                return report;
            }).then((saved) => {     
                callback.onSuccess({}, "Report id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateReport(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.checkBody(ReportHandler.KEYWORD_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    ReportModel.findOne({ _id: req.params.id }, function(err, report) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!report) {
                                reject(new NotFoundError("Report not found"));
                            } else {
                                resolve(report);
                            }
                        }
                    })
                });
            })
            .then((report) => {
                console.log("report",report)                
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        report[key] = data[key];
                    }
                }
                report.save();
                return report;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleReport(req, callback) {
        let data = req.body;
        console.log(req)
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                console.log("result",result)
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }                
                return new Promise(function(resolve, reject) {
                    ReportModel.findOne({ _id: req.params.id }, function(err, report) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!report) {
                                reject(new NotFoundError("Report not found"));
                            } else {
                                resolve(report);
                            }
                            resolve(report);
                        }
                        resolve(report);
                    })
                });
            })
            .then((report) => {
                console.log("report",report)
                callback.onSuccess(report);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllStoreReports(req, callback) {
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
                    ReportModel.find({ storeId: req.params.id }, function(err, report) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!report) {
                                reject(new NotFoundError("Report not found"));
                            } else {
                                resolve(report);
                            }
                        }
                    })
                });
            })
            .then((report) => {
                callback.onSuccess(report);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllUserReports(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    var errorMessages = {};
                    result.array().map(function(elem) {
                        return errorMessages[elem.param] = elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    ReportModel.find({ userId: req.params.id }, function(err, category) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!category) {
                                reject(new NotFoundError("Report not found"));
                            } else {
                                resolve(category);
                            }
                        }
                    })
                });
            })
            .then((report) => {
                callback.onSuccess(report);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllReports(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                ReportModel.find({}, function(err, category) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!category) {
                            reject(new NotFoundError("Report not found"));
                        } else {
                            resolve(category);
                        }
                    }
                })
            })
            .then((report) => {
                callback.onSuccess(report);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = ReportHandler;
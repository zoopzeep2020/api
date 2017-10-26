// /**
//  * Created by crosp on 5/13/17.
//  */
// const ReportModel = require(APP_MODEL_PATH + 'report').ReportModel;
// const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
// const ReportModel = require(APP_MODEL_PATH + 'report').ReportModel;
// const ValidationError = require(APP_ERROR_PATH + 'validation');
// const NotFoundError = require(APP_ERROR_PATH + 'not-found');
// const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

// class ReportHandler extends BaseAutoBindedClass {
//     constructor() {
//         super();
//         this._validator = require('validator');
//     }

//     static get REVIEW_VALIDATION_SCHEME() {
//         return {
//             'ratingScale': {
//                 notEmpty: false,
//                 errorMessage: 'rating Scale required'
//             },
//         };
//     }

//     static get REPORT_VALIDATION_SCHEME() {
//         return {
//             'description': {
//                 isLength: {
//                     options: [{ min: 10  }],
//                     errorMessage: 'description title must be 2 characters long'
//                 },
//                 notEmpty: false,
//                 errorMessage: 'description required'
//             },
//         };
//     }

//     createNewReport(req, callback) {
//         let data = req.body;
//         let validator = this._validator;
//         let ModelData = {};
//         req.checkBody(ReportHandler.REVIEW_VALIDATION_SCHEME);
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     let errorMessages = result.array().map(function (elem) {
//                         return elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }
//                 for (var key in data) {
//                     if (data.hasOwnProperty(key)) {
//                         ModelData[key] = data[key];
//                     }
//                 } 
//                 return new ReportModel(ModelData);
//             })
//             .then((report) => {
//                 report.save();
//                 return report;
//             })
//             .then((saved) => {
//                 StoreModel.findOne({ _id: req.body.storeId }, function(err, store) {
//                     if (err !== null) {
//                         new NotFoundError("store not found");
//                     } else {
//                         if (!store) {
//                             new NotFoundError("store not found");
//                         } else {
//                             store.avgRating = (store.avgRating*store.reportCount + parseInt(ModelData.ratingScale))/(store.reportCount+1);
//                             store.reportCount = store.reportCount + 1;
//                             store.save();
//                         }
//                     }
//                 }) 
//                 callback.onSuccess(saved);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     createReportReport(req, callback) {
//         let data = req.body;
//         let validator = this._validator;
//         let ModelData = {};
//         req.checkBody(ReportHandler.REPORT_VALIDATION_SCHEME);
//         req.checkBody('reportId', 'Invalid reportId').isMongoId().notEmpty();
//         req.checkBody('userId', 'Invalid userId').isMongoId().notEmpty();
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     let errorMessages = result.array().map(function (elem) {
//                         return elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }
//                 return new Promise(function(resolve, reject) {
//                     ReportModel.findOne({ _id: req.body.reportId }, function(err, report) {
//                         console.log(req.body.reportId)
//                         if (err !== null) {
//                             console.log()
//                                 reject(new NotFoundError("report not found"));
//                         } else {
//                             console.log("report",report);
//                             if (report == null) {
//                                 reject(new NotFoundError("report not found"));
//                             } 
//                             for (var key in data) {
//                                 if (data.hasOwnProperty(key)) {
//                                     ModelData[key] = data[key];
//                                 }
//                             } 
//                             resolve(new ReportModel(ModelData));
//                         }
//                     }) 
//                 })
//             })
//             .then((report) => {
//                 console.log("report",report)
//                 report.save();
//                 return report;
//             })
//             .then((saved) => {               
//                 callback.onSuccess(saved);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     deleteReport(user, req, callback) {
//         let data = req.body;
//         console.log(user);
//         req.checkParams('id', 'Invalid id provided').isMongoId();
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     let errorMessages = result.array().map(function (elem) {
//                         return elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }
//                 return new Promise(function(resolve, reject) {
//                     ReportModel.findOne({ _id: req.params.id }, function(err, report) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!report) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 if(user.isAdmin || (report.userId === user.userId)){
//                                     resolve(report);
//                                 }else{
//                                     reject(new NotFoundError("you are not allow to remove this report"));
//                                 }
//                             }
//                         }
//                     })
//                 });
//             })
//             .then((report) => {
//                 StoreModel.findOne({ _id: report.storeId }, function(err, store) {
//                     if (err !== null) {
//                         new NotFoundError("store not found");
//                     } else {
//                         if (!store) {
//                             new NotFoundError("store not found");
//                         } else {
//                             store.avgRating = (store.avgRating*store.reportCount - report.ratingScale)/(store.reportCount-1);
//                             store.reportCount = store.reportCount - 1;
//                             store.save();
//                         }
//                     }
//                 })
//                 return report;
//             })
//             .then((report) => {
//                 report.remove();
//                 return report;
//             }).then((saved) => {     
//                 callback.onSuccess({}, "Report id " + saved.id + " deleted successfully ");
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     updateReport(req, callback) {
//         let data = req.body;
//         let validator = this._validator;
//         req.checkParams('id', 'Invalid id provided').isMongoId();
//         req.checkBody(ReportHandler.KEYWORD_VALIDATION_SCHEME);
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     let errorMessages = result.array().map(function (elem) {
//                         return elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }

//                 return new Promise(function(resolve, reject) {
//                     ReportModel.findOne({ _id: req.params.id }, function(err, report) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!report) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 resolve(report);
//                             }
//                         }
//                     })
//                 });
//             })
//             .then((report) => {
//                 return new Promise(function(resolve, reject) {
//                     StoreModel.findOne({ _id: report.storeId }, function(err, store) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!store) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 store.avgRating = (store.avgRating*store.reportCount - report.ratingScale + req.body.ratingScale)/(store.reportCount); 
//                                 console.log("store",store.avgRating)
//                                 store.save();
//                                 resolve(report)
//                             }
//                         }
//                     })
//                 });
//             })
//             .then((report) => {
//                 console.log("report",report)                
//                 for (var key in data) {
//                     if (data.hasOwnProperty(key)) {
//                         report[key] = data[key];
//                     }
//                 }
//                 report.save();
//                 return report;
//             })
//             .then((saved) => {
//                 callback.onSuccess(saved);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     getSingleReport(req, callback) {
//         let data = req.body;
//         req.checkParams('id', 'Invalid id provided').isMongoId();
//         req.getValidationResult()
//             .then(function(result) {
//                 console.log("result",result)
//                 if (!result.isEmpty()) {
//                     var errorMessages = {};
//                     result.array().map(function(elem) {
//                         return errorMessages[elem.param] = elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }                
//                 return new Promise(function(resolve, reject) {
//                     ReportModel.findOne({ _id: req.params.id }, function(err, report) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!report) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 resolve(report);
//                             }
//                             resolve(report);
//                         }
//                         resolve(report);
//                     })
//                 });
//             })
//             .then((report) => {
//                 console.log("report",report)
//                 callback.onSuccess(report);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     getAllStoreReports(req, callback) {
//         let data = req.body;
//         req.checkParams('id', 'Invalid id provided').isMongoId();
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     let errorMessages = result.array().map(function (elem) {
//                         return elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }
//                 return new Promise(function(resolve, reject) {
//                     ReportModel.find({ storeId: req.params.id }, function(err, report) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!report) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 resolve(report);
//                             }
//                         }
//                     })
//                 });
//             })
//             .then((report) => {
//                 callback.onSuccess(report);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     getAllUserReports(req, callback) {
//         let data = req.body;
//         req.checkParams('id', 'Invalid id provided').isMongoId();
//         req.getValidationResult()
//             .then(function(result) {
//                 if (!result.isEmpty()) {
//                     var errorMessages = {};
//                     result.array().map(function(elem) {
//                         return errorMessages[elem.param] = elem.msg;
//                     });
//                     throw new ValidationError(errorMessages);
//                 }
//                 return new Promise(function(resolve, reject) {
//                     ReportModel.find({ userId: req.params.id }, function(err, category) {
//                         if (err !== null) {
//                             reject(err);
//                         } else {
//                             if (!category) {
//                                 reject(new NotFoundError("Report not found"));
//                             } else {
//                                 resolve(category);
//                             }
//                         }
//                     })
//                 });
//             })
//             .then((report) => {
//                 callback.onSuccess(report);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }

//     getAllReports(req, callback) {
//         let data = req.body;
//         new Promise(function(resolve, reject) {
//                 ReportModel.find({}, function(err, category) {
//                     if (err !== null) {
//                         reject(err);
//                     } else {
//                         if (!category) {
//                             reject(new NotFoundError("Report not found"));
//                         } else {
//                             resolve(category);
//                         }
//                     }
//                 })
//             })
//             .then((report) => {
//                 callback.onSuccess(report);
//             })
//             .catch((error) => {
//                 callback.onError(error);
//             });
//     }
// }

// module.exports = ReportHandler;
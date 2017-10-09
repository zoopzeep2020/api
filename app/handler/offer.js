
/**
 * Created by crosp on 5/9/17.
 */
const OfferModel = require(APP_MODEL_PATH + 'offer').OfferModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');

class OfferHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewOffer(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['offerPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['offerPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['offerPicture'].path, targetDir + fileName, function(err) {
                            req.body.offerPicture = targetDir + fileName;
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
                if(req.body.offerPicture != undefined){
                    req.checkBody('offerPicture', 'offerPicture is required').isImage(req.body.offerPicture);
                }else{
                    req.checkBody('offerPicture', 'offerPicture is required').notEmpty();
                }
                console.log(req.body.discountTypePercentage) 
                
                req.checkBody('discountTypePercentage', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                req.checkBody('discountTypeFlat', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                if(req.body.discountTypePercentage){
                    req.checkBody('percentageDiscount', 'Percentage should be between 1 to 100').checkNumberRange(req.body.percentageDiscount, 1, 100);
                }
                if(req.body.discountTypeFlat){
                    req.checkBody('flatDiscount', 'flatDiscount should be number').isInt();
                }
                req.checkBody('startDate', 'startDate must be in future and less than endDate').checkDateValidity(req.body.startDate, req.body.endDate);
                req.checkBody('endDate', 'endDate must be in future and greater than startDate').checkDateValidity(req.body.startDate, req.body.endDate);                
                req.checkBody('startDate', 'startDate must be in format of mm/dd/yyyy').isDate();
                req.checkBody('endDate', 'endDate must be in format of mm/dd/yyyy').isDate();    
                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        result.array().map(function(elem) {
                            return errorMessages[elem.param] = elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new OfferModel(data);                    
                })
                .then((offer) => {
                    offer.save();
                    return offer;
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

    deleteOffer(req, callback) {
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
                    OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!offer) {
                                reject(new NotFoundError("offer not found"));
                            } else {
                                if(user.isAdmin || (offer.storeId === user.storeId)){
                                    resolve(offer);
                                }else{
                                    reject(new NotFoundError("you are not allow to remove this offer"));
                                }
                            }
                        }
                    })
                });
            })
            .then((offer) => {
                offer.remove();
                return offer;
            })
            .then((saved) => {
                callback.onSuccess({}, "Offer id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateOffer(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['offerPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['offerPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['offerPicture'].path, targetDir + fileName, function(err) {
                            req.body.offerPicture = targetDir + fileName;
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
                /*if(req.body.offerPicture != undefined){
                    req.checkBody('offerPicture', 'offerPicture is required').isImage(req.body.offerPicture);
                }else{
                    req.checkBody('offerPicture', 'offerPicture is required').notEmpty();
                }*/
                if(req.body.discountTypePercentage != undefined){
                    req.checkBody('discountTypePercentage', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                }
                if(req.body.discountTypeFlat != undefined){
                    req.checkBody('discountTypeFlat', 'Either discountTypePercentage is true or discountTypeFlat is true').isOneTrue(req.body.discountTypePercentage, req.body.discountTypeFlat);
                }
                if(req.body.discountTypePercentage && (req.body.percentageDiscount != undefined)){
                    req.checkBody('percentageDiscount', 'Percentage should be between 1 to 100').checkNumberRange(req.body.percentageDiscount, 1, 100);
                }
                if(req.body.discountTypeFlat && (req.body.flatDiscount != undefined)){
                    req.checkBody('flatDiscount', 'flatDiscount should be number').isInt();
                }
                if(req.body.startDate != undefined){
                    req.checkBody('startDate', 'startDate must be in future and less than endDate').checkDateValidity(req.body.startDate, req.body.endDate);
                    req.checkBody('startDate', 'startDate must be in format of mm/dd/yyyy').isDate();
                }
                if(req.body.endDate != undefined){                    
                    req.checkBody('endDate', 'endDate must be in future and greater than startDate').checkDateValidity(req.body.startDate, req.body.endDate);                
                    req.checkBody('endDate', 'endDate must be in format of mm/dd/yyyy').isDate();
                }
                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        result.array().map(function(elem) {
                            return errorMessages[elem.param] = elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!offer) {
                                    reject(new NotFoundError("offer not found"));
                                } else {
                                    resolve(offer);
                                }
                            }
                        })
                    });
                })
                .then((offer) => {
                    for (var key in data) {
                        console.log(key)
                        offer[key] = data[key];
                    }  
                    offer.save();
                    return offer;
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

    getSingleOffer(req, callback) {
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
                OfferModel.findOne({ _id: req.params.id }, function(err, offer) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!offer) {
                            reject(new NotFoundError("Offer not found"));
                        } else {
                            resolve(offer);
                        }
                    }
                })
            });
        })
        .then((offer) => {
            callback.onSuccess(offer);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllOffers(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                OfferModel.find({}, function(err, posts) {
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

module.exports = OfferHandler;
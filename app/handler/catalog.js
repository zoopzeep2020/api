/**
 * Created by crosp on 5/13/17.
 */
/**
 * Created by crosp on 5/9/17.
 */
const CatalogModel = require(APP_MODEL_PATH + 'catalog').CatalogModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
var async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');

class CatalogHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get CATALOG_VALIDATION_SCHEME() {
        return {
            'catalogDescription': {
                isLength: {
                    options: [{ min: 2}],
                    errorMessage: 'Catalog description must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'Catalog description is required'
            }
        };
    }    

    createNewCatalog(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['catalogUrl'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['catalogUrl'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['catalogUrl'].path, targetDir + fileName, function(err) {
                            req.body.catalogUrl = targetDir + fileName;
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
                req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
                if(req.body.catalogUrl != undefined){
                    req.checkBody('catalogUrl', 'Catalog image is required').isImage(req.body.catalogUrl);
                }else{
                    req.checkBody('catalogUrl', 'Catalog image is required').notEmpty();
                }
                req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new CatalogModel(data);
                })
                .then((catalog) => {
                    catalog.save();
                    return catalog;
                })
                .then((catalog) => {
                    return new Promise(function(resolve, reject) {
                        StoreModel.findOne({ _id: catalog.storeId }, function(err, store) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!store) {
                                    reject(new NotFoundError("store not found"));
                                } else {
                                    if(store.featureCatalog == undefined){
                                        store.featureCatalog = catalog._id 
                                    }
                                    store.save();
                                    resolve(catalog);
                                }
                            }
                        })
                    });
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
   
    deleteCatalog(user, req, callback) {
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
                    CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                if(user.isAdmin || (catalog.storeId === user.storeId)){
                                    resolve(catalog);
                                }else{
                                    reject(new NotFoundError("you are not allow to remove this catalog"));
                                }
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                catalog.remove();
                return catalog;
            })
            .then((saved) => {
                callback.onSuccess({}, "Catalog id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateCatalog(req, callback) {
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['catalogUrl'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['catalogUrl'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['catalogUrl'].path, targetDir + fileName, function(err) {
                            req.body.catalogUrl = targetDir + fileName;
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
                if(req.body.catalogDescription != undefined){
                    req.checkBody(CatalogHandler.CATALOG_VALIDATION_SCHEME);
                }
                if(req.body.catalogUrl != undefined){
                    req.checkBody('catalogUrl', 'Catalog image is required').isImage(req.body.catalogUrl);
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
                        CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!catalog) {
                                    reject(new NotFoundError("Catalog not found"));
                                } else {
                                    resolve(catalog);
                                }
                            }
                        })
                    });
                })
                .then((catalog) => {
                    for (var key in data) {
                        catalog[key] = data[key];
                    }     
                    catalog.save();
                    return catalog;
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

    getFeatureCatalog(req, callback) {
        let data = req.body;
        req.checkQuery('lng', 'Invalid urlparam').notEmpty()
        req.checkQuery('lat', 'Invalid urlparam').notEmpty()
        // req.checkParams(req.query.lat, 'Invalid urlparam').notEmpty();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                new Promise(function(resolve, reject) {
                    StoreModel.aggregate([
                        {
                            "$geoNear": {
                                "near": {
                                    "type": "Point",
                                    "coordinates": [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                                },
                                "distanceField": "distance",
                                "spherical": true,
                                "maxDistance": 155000
                            }
                        },
                        {
                            $project: {
                                finalTotal: {
                                    $let: {
                                        vars: {
                                        total: { $divide: [ { $multiply: [ '$viewCount', 5 ] }, { $max: "$viewCount" }]},
                                        },
                                        in: { $add: [ "$avgRating", "$$total" ] }
                                    }
                                }
                            }
                        },
                        {
                            "$lookup": {
                                "from": 'stores',
                                "localField": "_id",
                                "foreignField": "_id",
                                "as": "storeInfo"
                            }
                        }, 
                        {
                            "$lookup": {
                                "from": 'catalogs',
                                "localField": "storeInfo.featureCatalog",
                                "foreignField": "_id",
                                "as": "catalogInfo"
                            }
                        },  
                         {
                            $unwind: {
                                path: "$storeInfo",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $unwind: {
                                path: "$catalogInfo",
                                preserveNullAndEmptyArrays: true
                              }
                        },
                        {
                            $project: {
                                storeId:'$catalogInfo.storeId',
                                featureCatalog:'$catalogInfo.featureCatalog',
                                catalogUrl:'$catalogInfo.catalogUrl',
                                catalogDescription:'$catalogInfo.catalogDescription',
                                finalTotal:'$finalTotal',
                            }
                        },
                        {$sort:{finalTotal:-1}},
                        {$limit:5},
                    ])
                    .exec(function(err, results){
                        resolve(results);
                    }) .then((results) => {   
                        callback.onSuccess(results);
                    })
                });
             })
           
            .catch((error) => {
                callback.onError(error);
            });
    }
   
    getSingleCatalog(req, callback) {
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
                    CatalogModel.findOne({ _id: req.params.id }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                resolve(catalog);
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                callback.onSuccess(catalog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllCatalogs(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                CatalogModel.find({}, function(err, posts) {
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

    getCatalogByStoreId(req, callback) {
        let data = req.body;
        req.checkParams('storeId', 'Invalid storeId provided').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    CatalogModel.find({ storeId: req.params.storeId }, function(err, catalog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!catalog) {
                                reject(new NotFoundError("Catalog not found"));
                            } else {
                                resolve(catalog);
                            }
                        }
                    })
                });
            })
            .then((catalog) => {
                callback.onSuccess(catalog);
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
module.exports = CatalogHandler;
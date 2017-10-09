
/**
 * Created by crosp on 5/9/17.
 */
const BlogModel = require(APP_MODEL_PATH + 'blog').BlogModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');

class BlogHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    createNewBlog(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['blogPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['blogPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['blogPicture'].path, targetDir + fileName, function(err) {
                            req.body.blogPicture = targetDir + fileName;
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
                if(req.body.blogPicture != undefined){
                    req.checkBody('blogPicture', 'blogPicture is required').isImage(req.body.blogPicture);
                }else{
                    req.checkBody('blogPicture', 'blogPicture is required').notEmpty();
                } 
                req.checkBody('title', 'title is required').notEmpty();  
                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new BlogModel(data);                    
                })
                .then((blog) => {
                    blog.save();
                    return blog;
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

    deleteBlog(req, callback) {
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
                    BlogModel.findOne({ _id: req.params.id }, function(err, blog) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!blog) {
                                reject(new NotFoundError("blog not found"));
                            } else {
                                if(user.isAdmin || (blog.storeId === user.storeId)){
                                    resolve(blog);
                                }else{
                                    reject(new NotFoundError("you are not allow to remove this blog"));
                                }
                            }
                        }
                    })
                });
            })
            .then((blog) => {
                blog.remove();
                return blog;
            })
            .then((saved) => {
                callback.onSuccess({}, "Blog id " + saved.id + " deleted successfully ");
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    updateBlog(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        async.waterfall([
            function(done, err) {
                if(typeof files['blogPicture'] !== "undefined"){
                    mkdirp(targetDir, function(err) {
                        var fileName = files['blogPicture'].originalname.replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['blogPicture'].path, targetDir + fileName, function(err) {
                            req.body.blogPicture = targetDir + fileName;
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
                if(req.body.blogPicture != undefined){
                    req.checkBody('blogPicture', 'blogPicture is required').isImage(req.body.blogPicture);
                } 
                if(req.body.title != undefined){
                    req.checkBody('title', 'title is required').notEmpty();
                }
                req.getValidationResult()
                .then(function(result) {
                    var errorMessages = {};
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError(errorMessages);
                    }  
                    return new Promise(function(resolve, reject) {
                        BlogModel.findOne({ _id: req.params.id }, function(err, blog) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!blog) {
                                    reject(new NotFoundError("blog not found"));
                                } else {
                                    resolve(blog);
                                }
                            }
                        })
                    });
                })
                .then((blog) => {
                    for (var key in data) {
                        console.log(key)
                        blog[key] = data[key];
                    }  
                    blog.save();
                    return blog;
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

    getSingleBlog(req, callback) {
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
                BlogModel.findOne({ _id: req.params.id }, function(err, blog) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        if (!blog) {
                            reject(new NotFoundError("Blog not found"));
                        } else {
                            resolve(blog);
                        }
                    }
                })
            });
        })
        .then((blog) => {
            callback.onSuccess(blog);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }

    getAllBlogs(req, callback) {
        let data = req.body;
        new Promise(function(resolve, reject) {
                BlogModel.find({}, function(err, posts) {
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

module.exports = BlogHandler;
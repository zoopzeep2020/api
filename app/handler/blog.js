
/**
 * Created by crosp on 5/9/17.
 */
const BlogModel = require(APP_MODEL_PATH + 'blog').BlogModel;
const mongoose = require('mongoose');
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
    static get BLOG_VALIDATION_SCHEME() {
        return {
            'description': {
                isLength: {
                    options: [{ min: 500}],
                    errorMessage: 'description must be 500 characters long'
                },
                notEmpty: true,
                errorMessage: 'description is required'
            },
            'title': {
                isLength: {
                    options: [{ min: 2}],
                    errorMessage: 'title must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'title is required'
            },
        };
    }  
    createNewBlog(req, callback) {
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        req.checkBody(BlogHandler.BLOG_VALIDATION_SCHEME);
        
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
                                resolve(blog);
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
                if(req.body.description != undefined){
                    req.checkBody(BlogHandler.BLOG_VALIDATION_SCHEME);
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

    likeBlog(req, callback) {
        let data = req.body;
        req.checkBody('blogId', 'Invalid urlparam').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    var like = req.body.like;
                    if(like){
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'likedBy':  mongoose.Types.ObjectId(req.body.userId) 
                        },{
                            '$push': { 'likedBy': mongoose.Types.ObjectId(req.body.userId) }
                        } ,{'new': true, 'multi':true}, function(err, blog){
                            resolve(blog);
                        })
                    }else if(!like){
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'likedBy':{ '$ne':  mongoose.Types.ObjectId(req.body.userId)}
                        },{
                            "$pull": { "likedBy": mongoose.Types.ObjectId(req.body.userId) }
                        } ,{'new': true, 'multi':true},function(err, blog){
                            resolve(blog);
                        }
                    )
                    }
                });
            }).then((blog) => {
                callback.onSuccess(blog);
            })          
            .catch((error) => {
                callback.onError(error);
            });
    }

    saveBlog(req, callback) {
        let data = req.body;
        req.checkBody('blogId', 'Invalid urlparam').isMongoId();
        req.getValidationResult()
            .then(function(result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function(resolve, reject) {
                    var save = req.body.save;
                    if(save){
                        BlogModel.update({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'savedBy': { '$ne': mongoose.Types.ObjectId(req.body.userId) }
                        },
                        {
                            '$push': { 'savedBy': mongoose.Types.ObjectId(req.body.userId) }
                        }).exec(function(err, results){
                            resolve(results);
                        }) 
                    }else if(!save){
                        BlogModel.update({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'savedBy':  mongoose.Types.ObjectId(req.body.userId)
                        },{
                            "$pull": { "savedBy": mongoose.Types.ObjectId(req.body.userId) }
                        }).exec(function(err, results){
                            resolve(results);
                        })
                    }
                    
                });
            })
            .then((result) => {
                callback.onSuccess(result);
            })
            .catch((error) => {
                callback.onError(error);
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
        if(array!== undefined){
            return array.reduce(function(p, c) {
                p[c['fieldname']] = c;
                return p;
            }, {});
            return array;
        }
    }
}

module.exports = BlogHandler;
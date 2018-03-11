
/**
 * Created by WebrexStudio on 5/9/17.
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
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
/**
 * @swagger
 * /blogs/withoutlogin:
 *   get:
 *     tags:
 *       - Blog
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Basic authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: maximumvsminimumsecurity
 *     responses:
 *       200:
 *         description: object of activity".     
 */
/**
 * @swagger
 * /blogs/trendingBlog:
 *   get:
 *     tags:
 *       - Blog
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Basic authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: maximumvsminimumsecurity
 *     responses:
 *       200:
 *         description: object of activity".     
 */
/**
* @swagger
* /blogs:
*   get:
*     tags:
*       - Blog
*     description: activity object
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: token authorization
*         in: header
*         required: true
*         type: string
*     responses:
*       200:
*         description: object of activity".     
*/

/**
* @swagger
* /blogs/{blogId}:
*   get:
*     tags:
*       - Blog
*     description: activity object
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: token authorization
*         in: header
*         required: true
*         type: string
*       - name: blogId
*         description: blogId
*         in: path
*         type: string
*     responses:
*       200:
*         description: object of activity".     
*/

/**
 * @swagger
 * /blogs/{blogId}:
 *   put:
 *     tags:
 *       - Blog
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: blogPicture
 *         in: formData
 *         description: The uploaded file of blogPicture
 *         required: true
 *         type: file
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         type: string
 *       - name: blogId
 *         description: blogId
 *         in: path
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".     
 */

/**
* @swagger
* /blogs/like:
*   put:
*     tags:
*       - Blog
*     description: activity object
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: token authorization
*         in: header
*         type: string
*       - name: blogId
*         description: blogId
*         in: body
*         type: string
*       - name: userId
*         description: userId
*         in: body
*         type: string
*       - name: like
*         description: like
*         in: body
*         type: boolean
*     schema:
*       $ref: '#/definitions/UpdateActivitiesObj'
*     responses:
*       200:
*         description: object of activity".     
*/

/**
* @swagger
* /blogs/save:
*   put:
*     tags:
*       - Blog
*     description: activity object
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: token authorization
*         in: header
*         type: string
*       - name: blogId
*         description: blogId
*         in: body
*         type: string
*       - name: userId
*         description: userId
*         in: body
*         type: string
*       - name: save
*         description: save
*         in: body
*         type: boolean
*     schema:
*       $ref: '#/definitions/UpdateActivitiesObj'
*     responses:
*       200:
*         description: object of activity".     
*/

/**
 * @swagger
 * /blogs:
 *   post:
 *     tags:
 *       - Blog
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: blogPicture
 *         in: formData
 *         description: The uploaded file of blogPicture
 *         required: true
 *         type: file
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: Content-Type
 *         description: content-type
 *         in: header
 *         required: true
 *         type: string
 *         default: application/json
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *       - name: description
 *         description: description of blog
 *         in: body
 *         required: true
 *         type: string
 *       - name: title
 *         description: title of blog
 *         in: body
 *         required: true
 *         type: string
 *       - name: metaDescription
 *         description: metaDescription of blog
 *         in: body
 *         required: true
 *         type: string
 *       - name: metaKeyword
 *         description: metaKeyword of blog
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *          $ref: '#/definitions/UpdateActivitiesObj'
 *     responses:
 *       200:
 *         description: object of activity".
 */

/**
* @swagger
* definition:
*   UpdateActivitiesObj:
*     properties:
*       title:
*         type: string
*         required: true
*       blogPicture:
*         type: string
*         required: true
*       description:
*         type: string
*         required: true
*       authorImage:
*         type: string
*         required: true
*       authorName:
*         type: string
*         required: true 
*       metaDescription:
*         type: string
*         required: true 
*       metaKeyword:
*         type: string
*         required: true 
*       likeCount:
*         type: integer
*         required: true 
*       saveCount:
*         type: integer
*         required: true
*       likedBy:
*         type: array
*         items:
*          type: string
*       savedBy:
*         type: array
*         items:
*          type: string
*/
class BlogHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get BLOG_VALIDATION_SCHEME() {
        return {
            'description': {
                isLength: {
                    options: [{ min: 50 }],
                    errorMessage: 'description must be 500 characters long'
                },
                notEmpty: true,
                errorMessage: 'description is required'
            },
            'title': {
                isLength: {
                    options: [{ min: 2 }],
                    errorMessage: 'title must be 2 characters long'
                },
                notEmpty: true,
                errorMessage: 'title is required'
            },

        };
    }

    createNewBlog(req, callback) {
        let ModelData = {}
        let validator = this._validator;
        const targetDir = 'public/' + (new Date()).getFullYear() + '/' + (((new Date()).getMonth() + 1) + '/');
        let files = this.objectify(req.files);
        req.checkBody(BlogHandler.BLOG_VALIDATION_SCHEME);
        async.waterfall([
            function (done, err) {
                if (typeof files['blogPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['blogPicture'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['blogPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.blogPicture = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done, err) {
                if (typeof files['authorImage'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['authorImage'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['authorImage'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.authorImage = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done) {
                if (req.body.blogPicture != undefined) {
                    req.checkBody('blogPicture', 'blogPicture is required').isImage(req.body.blogPicture);
                } else {
                    req.checkBody('blogPicture', 'blogPicture is required').notEmpty();
                }
                if (req.body.authorImage != undefined) {
                    req.checkBody('authorImage', 'authorImage is required').isImage(req.body.blogPicture);
                } else {
                    req.checkBody('authorImage', 'authorImage is required').notEmpty();
                }
                req.getValidationResult()
                    .then(function (result) {
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
                        blog.URL = req.body.title.trim().toLowerCase().replace(/[^\w\. ]+/g, '').replace(/ +/g, '-');
                        blog.likeCount = 0
                        blog.saveCount = 0
                        blog.save();
                        return blog;
                    })
                    .then((saved) => {
                        // ModelData['blogId'] = saved._id
                        // ModelData['title'] = 'title'
                        // ModelData['deviceToken'] = 'cFbFZZeGWu8:APA91bEhOIstS0w38G-W21kFOJl2jztIGk2aRf7JfRu6LN1RPgC73csj6ZZlOtLhdbrAZ3cKHe1xPHXD-kAw2jaiAjOQH0picWL-i0qXCvsqHJhlr5A4xUPsm80liG7cr721WZM4fztY'
                        // ModelData['deviceType'] =  'Android'
                        // ModelData['notificationType'] = 'blog'
                        // ModelData['description'] =  'ZeepZoop has added new blog';
                        // StoreNotificationModel(ModelData).save();
                        // if(ModelData['deviceToken']){
                        //     if (ModelData['deviceType'] == 'Android') {
                        //         sendAndroidNotification(ModelData)
                        //     } else if (ModelData['deviceType'] == 'IOS') {
                        //         sendAppleNotification(ModelData)
                        //     } 
                        // }
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
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    deleteBlog(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    BlogModel.findOne({ _id: req.params.id }, function (err, blog) {
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
            function (done, err) {
                if (typeof files['blogPicture'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['blogPicture'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['blogPicture'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.blogPicture = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done, err) {
                if (files != undefined && typeof files['authorImage'] !== "undefined") {
                    mkdirp(targetDir, function (err) {
                        var fileName = files['authorImage'].originalname.trim().replace(/[^\w\. ]+/g, '').replace(/\s+/g, '-').toLowerCase();
                        fs.rename(files['authorImage'].path, targetDir + fileName, function (err) {
                            imagemin([targetDir + fileName], targetDir, {
                                plugins: [
                                    imageminMozjpeg(),
                                    imageminPngquant({ quality: '65-80' })
                                ]
                            }).then(files => { });
                            req.body.authorImage = targetDir + fileName;
                            let data = req.body;
                            done(err, data);
                        });
                    });
                } else {
                    let data = req.body;
                    done(err, data);
                }
            },
            function (data, done) {
                if (req.body.blogPicture != undefined) {
                    req.checkBody('blogPicture', 'blogPicture is required').isImage(req.body.blogPicture);
                }
                if (req.body.authorImage != undefined) {
                    req.checkBody('authorImage', 'authorImage is required').isImage(req.body.authorImage);
                }
                if (req.body.title != undefined) {
                    req.checkBody('title', 'title is required').notEmpty();
                }
                if (req.body.description != undefined) {
                    req.checkBody(BlogHandler.BLOG_VALIDATION_SCHEME);
                }
                if (req.body.metaDescription != undefined) {
                    req.checkBody('metaDescription', 'metaDescription is required').notEmpty();
                }
                if (req.body.metaKeyword != undefined) {
                    req.checkBody('metaKeyword', 'metaKeyword is required').notEmpty();
                }

                req.getValidationResult()
                    .then(function (result) {
                        var errorMessages = {};
                        if (!result.isEmpty()) {
                            let errorMessages = result.array().map(function (elem) {
                                return elem.msg;
                            });
                            throw new ValidationError(errorMessages);
                        }
                        return new Promise(function (resolve, reject) {
                            BlogModel.findOne({ _id: req.params.id }, function (err, blog) {
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
        ], function (err, data) {
            if (err) return callback.onError(err);
            else return data;
        });
    }

    likeBlog(req, callback) {
        let data = req.body;
        req.checkBody('blogId', 'Invalid urlparam').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    var like = req.body.like;
                    if (like) {
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'likedBy': mongoose.Types.ObjectId(req.body.userId)
                        },
                            {
                                '$addToSet': { 'likedBy': mongoose.Types.ObjectId(req.body.userId) },
                            },
                            { 'new': true, 'multi': true },
                            function (err, blog) {
                                blog.likeCount = blog.likeCount + 1;
                                blog.isLike = true;
                                blog.save();
                                resolve(blog);
                            })
                    } else if (!like) {
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'likedBy': { '$ne': mongoose.Types.ObjectId(req.body.userId) }
                        },
                            {
                                "$pull": { "likedBy": mongoose.Types.ObjectId(req.body.userId) }
                            },
                            { 'new': true, 'multi': true },
                            function (err, blog) {
                                blog.likeCount = blog.likeCount - 1;
                                blog.isLike = false;
                                blog.save();
                                resolve(blog);
                            })
                    }
                });
            }).then((blog) => {
                callback.onSuccess(blog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    /*likeBlog(req, callback) {
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
                            'likedBy': { "$ne":  mongoose.Types.ObjectId(req.body.userId) }
                        },
                        {
                            "$inc": { "likeCount": 1 },
                            '$push': { 'likedBy': mongoose.Types.ObjectId(req.body.userId) },
                        },
                        {'new': true},
                            function(err, blog){
                                // blog.likeCount = blog.likeCount+1;
                                blog.isLike = true;
                                // blog.save();
                                resolve(blog);
                            })
                    }else if(!like){
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'likedBy':{ '$ne':  mongoose.Types.ObjectId(req.body.userId)}
                        },
                        {
                            "$inc": { "likeCount": -1 },
                            
                            "$pull": { "likedBy": mongoose.Types.ObjectId(req.body.userId) }
                        },
                        {'new': true, 'multi':true},
                        function(err, blog){
                            // blog.likeCount = blog.likeCount-1;
                            blog.isLike = false;
                            blog.save();
                            resolve(blog);
                        })
                    }
                });
            }).then((blog) => {
                callback.onSuccess(blog);
            })          
            .catch((error) => {
                callback.onError(error);
            });
    }*/

    saveBlog(req, callback) {
        let data = req.body;
        req.checkBody('blogId', 'Invalid urlparam').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    var save = req.body.save;
                    if (save) {
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'savedBy': { '$ne': mongoose.Types.ObjectId(req.body.userId) }
                        },
                            {
                                '$addToSet': { 'savedBy': mongoose.Types.ObjectId(req.body.userId) }
                            }, { 'new': true, 'multi': true }).exec(function (err, blog) {
                                blog.saveCount = blog.saveCount + 1;
                                blog.isSave = save;
                                blog.save()
                                resolve(blog);
                            })
                    } else if (!save) {
                        BlogModel.findByIdAndUpdate({
                            '_id': mongoose.Types.ObjectId(req.body.blogId),
                            'savedBy': mongoose.Types.ObjectId(req.body.userId)
                        },
                            {
                                "$pull": { "savedBy": mongoose.Types.ObjectId(req.body.userId) }
                            }, { 'new': true, 'multi': true }).exec(function (err, blog) {
                                blog.saveCount = blog.saveCount - 1;
                                blog.isSave = save;
                                blog.save()
                                resolve(blog);
                            })
                    }

                });
            })
            .then((blog) => {
                callback.onSuccess(blog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getSingleBlog(user, req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    BlogModel.aggregate({ "$match": { "_id": { "$in": [mongoose.Types.ObjectId(req.params.id)] } } },
                        {
                            $unwind: {
                                path: "$savedBy",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$likedBy",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $project: {
                                isLike: {
                                    $cond: {
                                        if: { $eq: ["$likedBy", mongoose.Types.ObjectId(user.id)] },
                                        then: true,
                                        else: false
                                    }
                                },
                                isSave: {
                                    $cond: {
                                        if: { $eq: ["$savedBy", mongoose.Types.ObjectId(user.id)] },
                                        then: true,
                                        else: false
                                    }
                                },
                                dateCreated: 1,
                                dateModified: 1,
                                likeCount: 1,
                                title: 1,
                                blogPicture: 1,
                                description: 1,
                                authorName: 1,
                                authorImage: 1,
                                saveCount: 1,
                                URL: 1,
                            }
                        },
                        {
                            $group: {
                                _id: '$_id',
                                title: { $first: '$title' },
                                blogPicture: { $first: '$blogPicture' },
                                description: { $first: '$description' },
                                authorName: { $first: '$authorName' },
                                authorImage: { $first: '$authorImage' },
                                dateCreated: { $first: '$dateCreated' },
                                dateModified: { $first: '$dateModified' },
                                likeCount: { $first: '$likeCount' },
                                saveCount: { $first: '$saveCount' },
                                URL: { $first: '$URL' },
                                isLike: { $max: '$isLike' },
                                isSave: { $max: '$isSave' }
                            }
                        },
                        function (err, blog) {
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
                for (var i = 0; i < blogs.length; i++) {
                    blogs[i].time = this.getDDMMMYYYY(blogs[i].dateCreated)
                }
                callback.onSuccess(blog);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getAllBlogs(user, req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            BlogModel.aggregate(
                {
                    $unwind: {
                        path: "$savedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$likedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        isLike: {
                            $cond: {
                                if: { $eq: ["$likedBy", mongoose.Types.ObjectId(user.id)] },
                                then: true,
                                else: false
                            }
                        },
                        isSave: {
                            $cond: {
                                if: { $eq: ["$savedBy", mongoose.Types.ObjectId(user.id)] },
                                then: true,
                                else: false
                            }
                        },
                        dateCreated: 1,
                        dateModified: 1,
                        likeCount: 1,
                        title: 1,
                        blogPicture: 1,
                        description: 1,
                        authorName: 1,
                        authorImage: 1,
                        saveCount: 1,
                        metaDescription: 1,
                        metaKeyword: 1,
                        URL: 1,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        blogPicture: { $first: '$blogPicture' },
                        description: { $first: '$description' },
                        authorName: { $first: '$authorName' },
                        authorImage: { $first: '$authorImage' },
                        dateCreated: { $first: '$dateCreated' },
                        dateModified: { $first: '$dateModified' },
                        likeCount: { $first: '$likeCount' },
                        saveCount: { $first: '$saveCount' },
                        metaDescription: { $first: '$metaDescription' },
                        metaKeyword: { $first: '$metaKeyword' },
                        URL: { $first: '$URL' },
                        isLike: { $max: '$isLike' },
                        isSave: { $max: '$isSave' }
                    }
                },
                function (err, blogs) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve(blogs);
                    }
                });
        }).then((blogs) => {
            for (var i = 0; i < blogs.length; i++) {
                blogs[i].time = this.getDDMMMYYYY(blogs[i].dateCreated)
            }
            callback.onSuccess(blogs);
        }).catch((error) => {
            callback.onError(error);
        });
    }

    getAllWithoutLogin(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            BlogModel.aggregate(
                {
                    $unwind: {
                        path: "$savedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$likedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        dateCreated: 1,
                        dateModified: 1,
                        likeCount: 1,
                        title: 1,
                        blogPicture: 1,
                        description: 1,
                        authorName: 1,
                        authorImage: 1,
                        saveCount: 1,
                        metaKeyword: 1,
                        metaDescription: 1,
                        URL: 1,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        blogPicture: { $first: '$blogPicture' },
                        description: { $first: '$description' },
                        authorName: { $first: '$authorName' },
                        authorImage: { $first: '$authorImage' },
                        dateCreated: { $first: '$dateCreated' },
                        dateModified: { $first: '$dateModified' },
                        likeCount: { $first: '$likeCount' },
                        saveCount: { $first: '$saveCount' },
                        metaDescription: { $first: '$metaDescription' },
                        metaKeyword: { $first: '$metaKeyword' },
                        URL: { $first: '$URL' },
                    }
                },
                function (err, blogs) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve(blogs);
                    }
                });
        }).then((blogs) => {
            for (var i = 0; i < blogs.length; i++) {
                blogs[i].time = this.getDDMMMYYYY(blogs[i].dateCreated)
            }
            callback.onSuccess(blogs);
        })
            .catch((error) => {
                callback.onError(error);
            });
    }

    getTrendingBlog(req, callback) {
        let data = req.body;
        new Promise(function (resolve, reject) {
            BlogModel.aggregate(
                { $sort: { likeCount: -1 } },
                function (err, blogs) {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve(blogs);
                    }
                });
        }).then((blogs) => {
            for (var i = 0; i < blogs.length; i++) {
                blogs[i].time = this.getDDMMMYYYY(blogs[i].dateCreated)
            }
            callback.onSuccess(blogs);
        }).catch((error) => {
            callback.onError(error);
        });
    }
    // getStoreCatalog(i, storeId) {
    //     return new Promise(function (resolve, reject) {
    //         CatalogModel.find({ storeId: storeId }).limit(3).exec(function (err, catalog) {
    //             return resolve([i, catalog]);
    //         })
    //     });
    // }

    getBlogBySearch(req, callback) {
        let data = req.body;
        var ObjectID = require('mongodb').ObjectID;
        let query = req.query;
        let mongoQuery = {};
        let skip = 0;
        let limit = 10;
        let sorting = {};

        for (var key in query) {
            if (key == "search") {
                mongoQuery['$or'] = [
                    { 'title': { $regex: new RegExp(query[key], 'i') } },
                    { 'description': { $regex: new RegExp(query[key], 'i') } }
                ]
            } else if (key == "URL") {
                mongoQuery['URL'] = query[key]
            } else if (key == "startBlogs") {
                skip = parseInt(query[key]);
            } else if (key == "endBlogs") {
                limit = parseInt(query[key]) - skip + 1;
            } else if (key == "trending") {
                sorting = query["trending"] == 'true' ? { likeCount: -1 } : {}
            }
        }
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
            return new Promise(function (resolve, reject) {
                BlogModel.find(mongoQuery).skip(skip).limit(limit).sort(sorting).lean().exec(function (err, results) {
                    resolve(results);
                })
            });
        })
            .then((results) => {
                for (var i = 0; i < results.length; i++) {
                    results[i].time = this.getDDMMMYYYY(results[i].dateCreated)
                }
                callback.onSuccess(results);
            }).catch((error) => {
                callback.onError(error);
            });
    }

    getBlogByUrl(req, callback) {
        let data = req.body;
        var ObjectID = require('mongodb').ObjectID;
        let mongoQuery = {};
        mongoQuery['URL'] = req.params.url
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError(errorMessages);
                }
                return new Promise(function (resolve, reject) {
                    BlogModel.findOne(mongoQuery).lean().exec(function (err, results) {
                        resolve(results);
                    })
                });
            })
            .then((results) => {
                for (var i = 0; i < results.length; i++) {
                    results[i].time = this.getDDMMMYYYY(results[i].dateCreated)
                }
                callback.onSuccess(results);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    objectify(array) {
        if (array !== undefined) {
            return array.reduce(function (p, c) {
                p[c['fieldname']] = c;
                return p;
            }, {});
            return array;
        }
    }

    noNaN(n) { return isNaN(n) ? 0 : n; }

    getDDMMMYYYY(date1) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var new_date = new Date(date1);
        var dateStr = new_date.getDate() + ' '
            + months[new_date.getMonth()] + ' '
            + new_date.getFullYear();
        return dateStr;
    }

    timeago(nd, s) {
        var o = {
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 1000 * 60,
            day: 24 * 60 * 1000 * 60,
            week: 7 * 24 * 60 * 1000 * 60,
            month: 30 * 24 * 60 * 1000 * 60,
            year: 365 * 24 * 60 * 1000 * 60
        };
        var obj = {};

        var r = Math.round,
            dir = ' ago',
            pl = function (v, n) {
                return (s === undefined) ? n + ' ' + v + (n > 1 ? 's' : '') + dir : n + v.substring(0, 1)
            },
            ts = Date.now() - new Date(nd).getTime(),
            ii;
        if (ts < 0) {
            ts *= -1;
            dir = ' ago';
        }
        for (var i in o) {
            if (r(ts) < o[i]) return pl(ii || 'm', r(ts / (o[ii] || 1)))
            ii = i;
        }
        return pl(i, r(ts / o[i]));
    }
}

module.exports = BlogHandler;

/**
 * Created by WebrexStudio on 5/9/17.
 */
const UserNotificationModel = require(APP_MODEL_PATH + 'userNotification').UserNotificationModel;
const StoreModel = require(APP_MODEL_PATH + 'user').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const path = require('path');
const mongoose = require('mongoose');
const url = require('url');
var request = require('request');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class UserNotificationHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    getUserNotification(user, req, callback) {
        let data = req.body;
        let query = req.query
        let skip = 0;
        let limit = 10;
        let mongoQuery = {};
        
        for (var key in query) {
            if (key == 'userId') {
                mongoQuery['userId'] = query[key];
            } else if (key == "startUsers") {
                skip = parseInt(query[key]);
            } else if (key == "endUsers") {
                limit = parseInt(query[key]) - skip + 1;
            } 
        }
        
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                let errorMessages = result.array().map(function (elem) {
                    return elem.msg;
                });
                throw new ValidationError(errorMessages);
            }
        }).then((users) => {
            return new Promise(function (resolve, reject) {
                UserNotificationModel.find(mongoQuery).skip(skip).limit(limit).lean().exec(function (err, UserNotifications) {
                    resolve(UserNotifications);
                })
            }).then((UserNotifications) => {
                callback.onSuccess(UserNotifications);
            }).catch((error) => {
                callback.onError(error);
            });
        })
    }

    

    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }

    getDDMMMYYYY(date1) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var new_date = new Date(date1);
        var dateStr = new_date.getDate() + ' '
            + months[new_date.getMonth()] + ' '
            + new_date.getFullYear();
        return dateStr;
    }
}

module.exports = UserNotificationHandler;
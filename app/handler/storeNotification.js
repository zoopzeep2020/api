
/**
 * Created by WebrexStudio on 5/9/17.
 */
const StoreNotificationModel = require(APP_MODEL_PATH + 'storeNotification').StoreNotificationModel;
const StoreModel = require(APP_MODEL_PATH + 'store').StoreModel;
const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');

const sendAndroidNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAndroidNotification;
const sendAppleNotification = require(APP_HANDLER_PATH + 'pushNotification').sendAppleNotification;
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

class StoreNotificationHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    getStoreNotification(user, req, callback) {
        let data = req.body;
        let query = req.query
        let skip = 0;
        let limit = 10;
        let mongoQuery = {};
        
        for (var key in query) {
            if (key == 'storeId') {
                mongoQuery['storeId'] = query[key];
            } else if (key == "startStores") {
                skip = parseInt(query[key]);
            } else if (key == "endStores") {
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
        }).then((stores) => {
            return new Promise(function (resolve, reject) {
                StoreNotificationModel.find(mongoQuery).skip(skip).limit(limit).lean().exec(function (err, StoreNotifications) {
                    resolve(StoreNotifications);
                })
            }).then((StoreNotifications) => {
                callback.onSuccess(StoreNotifications);
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

module.exports = StoreNotificationHandler;
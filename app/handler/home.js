
/**
 * Created by WebrexStudio on 5/9/17.
 */
const FeedbackModel = require(APP_MODEL_PATH + 'feedback').FeedbackModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const InvalidPayloadError = require(APP_ERROR_PATH + 'invalid-payload');
const NotFoundError = require(APP_ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const mongoose = require('mongoose');
const url = require('url');
var request = require('request');
var async = require('async');
   

class HomeHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    requestAsync(req, url, type) {
        return new Promise(function (resolve, reject) {
            var URLStore = url;
            var optionsStore = {
                url: URLStore,
                method: 'GET',
                headers: req.headers
            };
            request(optionsStore, type, function (error, response, body) {
                return resolve([type, JSON.parse(body)['data']]);
            });
        });
    }

    getHome(req, callback) {
        let data = req.body;
        var queryString = url.parse(req.url, true).search;
        var matchQuery = [];
        var ObjectID = require('mongodb').ObjectID;
        var qString, object1, object2, object3 = {};
        var longitude = this.noNaN(parseFloat(req.query.lng));
        var lattitude = this.noNaN(parseFloat(req.query.lat));
        for (var param in req.query) {
            if (param !== "lng" && param !== "lat") {
                qString = {};
                qString[param] = (mongoose.Types.ObjectId.isValid(req.query[param])) ? mongoose.Types.ObjectId(req.query[param]) : (req.query[param] == "true") ? req.query[param] == "true" : (req.query[param] == "false") ? req.query[param] == "true" : req.query[param];
                matchQuery.push(qString);
            }
        }

        var mainObj = {};
        Promise.all([
            this.requestAsync(req, 'http://' + req.get('host') + '/stores/search' + queryString, 'trendingStores'),
            // this.requestAsync(req, 'http://' + req.get('host') + '/catalogs/featurecatalog' + queryString, 'trendingCatalog'),
            this.requestAsync(req, 'http://' + req.get('host') + '/collections/search' + queryString, 'trendingCollections')
        ])
        .then(function (allData) {
            mainObj['trendingCatalog'] = [];
            return new Promise(function (resolve, reject) {
                for (let i = 0; i < allData.length; i++) {
                    mainObj[allData[i][0]] = allData[i][1]
                    if (allData[i][0] == 'trendingStores') {
                        for (let j = 0; j < allData[i][1].length; j++) {
                            mainObj['trendingCatalog'].push(allData[i][1][j].featureCatalog);
                        }
                    }
                }
                resolve(mainObj);
            });
        }).then((mainObj) => {
            callback.onSuccess(mainObj);
        }).catch((error) => {
            callback.onError(error);
        });
    }
    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }
    noNaN(n) { return isNaN(n) ? 0 : n; }
}

module.exports = HomeHandler;
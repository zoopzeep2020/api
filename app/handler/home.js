
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

class FeedbackHandler extends BaseAutoBindedClass {
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
        // var socket ;
        // // socket.on('news', function(data) {
        // //     console.log(data);
        // // });
        // io.on('connection', function(socket) {
        //         console.log('Client connected.');
        //         // Disconnect listener
        //         socket.on('disconnect', function() {
        //             console.log('Client disconnected.');
        //         });
        //     });
        // if( 'serviceWorker' in navigator){
        //     navigator.serviceWorker
        //     .register('sw.js')
        //     .then((reg)=>{
        //         console.log('Hello there !',reg)
        //         reg.pushManager.subscribe({
        //             userVisibleOnly:true
        //         }).then((sub)=>{
        //             io.on('connection', function (socket) {
        //                 socket.emit('news', { hello: 'world' });
        //                 socket.on('my other event', function (data) {
        //                     console.log(data);
        //                 });
        //             }); 
        //         })
        //     })
        // }
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
            this.requestAsync(req, 'http://' + req.get('host') + '/stores/trendingstore' + queryString, 'trendingStores'),
            this.requestAsync(req, 'http://' + req.get('host') + '/catalogs/featurecatalog' + queryString, 'trendingCatalog'),
            this.requestAsync(req, 'http://' + req.get('host') + '/collections/searchByQuery' + queryString, 'trendingCollections')
        ])
            .then(function (allData) {
                for (let i = 0; i < allData.length; i++) {
                    mainObj[allData[i][0]] = allData[i][1]
                }
                callback.onSuccess(mainObj);
            });

        // async.waterfall([
        //     function (done, err) {


        //     },
        //     function (data, done, err) {
        //         var URLCatalog = 'http://' + req.get('host') + '/catalogs/featurecatalog' + queryString;
        //         var optionsCatalog = {
        //             url: URLCatalog,
        //             method: 'GET',
        //             headers: req.headers
        //         };
        //         request(optionsCatalog, function (error, response, body) {
        //             mainObj['trendingCatalog'] = JSON.parse(body)['data'];
        //             let data = mainObj
        //             done(err, data);
        //         })
        //     },
        //     function (data, done) {
        //         var URLCollection = 'http://' + req.get('host') + '/collections/searchByQuery' + queryString;
        //         var optionsCollection = {
        //             url: URLCollection,
        //             method: 'GET',
        //             headers: req.headers
        //         };
        //         request(optionsCollection, function (error, response, body) {
        //             mainObj['trendingCollections'] = JSON.parse(body)['data'];
        //             let data = mainObj
        //             callback.onSuccess(mainObj);
        //         })
        //     }
        // ], function (err, data) {
        //     if (err) return callback.onError(err);
        //     else return data;
        // });
    }
    objectify(array) {
        return array.reduce(function (p, c) {
            p[c['fieldname']] = c;
            return p;
        }, {});
    }
    noNaN(n) { return isNaN(n) ? 0 : n; }
}

module.exports = FeedbackHandler;
/**
 * Created by crosp on 5/8/17.
 */
// Root path
global.APP_ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/global-paths');
// Set config variables
global.config = require('./config');

// Create an Express App
const express = require('express');
expressValidator = require('express-validator');
const app = express();
// Include dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require(APP_ROUTE_PATH);
const ValidationManager = require(APP_MANAGER_PATH + 'validation');
const authManager = require(APP_MANAGER_PATH + 'auth');
const validationManager = new ValidationManager();
const path = require('path');

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_CONNECT_URL);
//se json formatter middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(authManager.providePassport().initialize());
// Set Up validation middleware
app.use(validationManager.provideDefaultValidator());


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept-Language, Authorization");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Content-Type', 'application/json');
//     if ('OPTIONS' === req.method) {
//         res.sendStatus(200);
//     } else
//         next();
// });

// Setup routes

// app.use(expressValidator({
//     customValidators: {
//         isPDF: function(value, filename) {
//             var extension = (path.extname(filename)).toLowerCase();
//             return extension == '.pdf';
//         }
//     }
// }));
//requiring the validator
var expressValidator = require('express-validator');
//the app use part
app.use(expressValidator({
customValidators: {
    isImage: function(value, filename) {
        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    },
    isOneTrue: function(value, bool1, bool2){
        if((bool1 || bool2) && !(bool1 && bool2)){
            return true;
        }
        return false;
    },
    checkNumberRange: function(value, inputNumber , min , max){
        if((inputNumber >= min) && (inputNumber <= max)){
            return true;
        }
        return false;
    },
    checkDateValidity: function(value, startDate, endDate){
        var startDate = new Date(startDate).getTime();
        var endDate = new Date(endDate).getTime();
        var currentDate = new Date().getTime();
        if(startDate >currentDate && endDate>currentDate && startDate<endDate){
            return true;
        }
        return false;
    },
    checkLength:function(value, str, min) {
        if(str.length<min){
            return false;
        }
        return true;
    }
}}));

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/', routes);

app.listen(global.config.server.PORT, function() {
    console.log(process.env.NODE_ENV, process.env.PORT, config.db.MONGO_CONNECT_URL);
    console.log('App is running on ' + global.config.server.PORT);
});


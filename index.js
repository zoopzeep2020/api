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

////-------------------swagger-------------------//
var swaggerJSDoc = require('swagger-jsdoc');
if(global.config.server.PORT === 3000){
    var host = 'localhost:' + global.config.server.PORT;
}else{
    var host = 'webrexstudio.com:' + global.config.server.PORT;
}
//swagger swaggerDefinition
var swaggerDefinition = {
  info: {
    title: 'Welcome to MangoBilling API Doc',
    version: '1.0.0',
    description: 'Using this doc you may understand the functionality and test the MangoBilling RESTful APIs. We developed Some webservices so far and it is growing.',
  },
  host: host,
  basePath: '/'
};

var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./app/handler/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/api.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept-Language, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Content-Type', 'text/css');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else
        next();
});

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
app.get('/swagger', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname+ '/swagger/api-docs/index.html'));
});

app.use(express.static(__dirname + '/swagger'));
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/', routes);

var server = app.listen(global.config.server.PORT, function() {
    console.log(process.env.NODE_ENV, process.env.PORT, config.db.MONGO_CONNECT_URL);
    console.log('App is running on ' + global.config.server.PORT);
});


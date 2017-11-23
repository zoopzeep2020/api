var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var logger = require('morgan');


var app = express();

//view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

require('./middlewares/passport')(passport); // pass passport for configuration

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////-------------------swagger-------------------//
var swaggerJSDoc = require('swagger-jsdoc');

//swagger swaggerDefinition
var swaggerDefinition = {
    info: {
        title: 'Welcome to Zeepzoop API Doc',
        version: '1.1.0',
        description: 'Using this doc you may understand the functionality and test the MangoBilling RESTful APIs. We developed Some webservices so far and it is growing.',
    },
    host: 'localhost:3000',//'52.39.142.240:3000',
    basePath: '/'
};

var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./controllers/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept-Language, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    }
    else 
      next();
});

require('./routes/routes')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/auth/facebook', passport.authenticate('facebook', { 
  scope : ['public_profile', 'email']
}));
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

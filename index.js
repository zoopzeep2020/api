/**
 * Created by crosp on 5/8/17.
 */
// Root path
global.APP_ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/global-paths');
// Set config variables
global.config = require('./config');
var passport = require('passport');
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
global.navigator = {
    userAgent: 'node.js'
};
mongoose.connect(config.db.MONGO_CONNECT_URL);
//se json formatter middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(authManager.providePassport().initialize());
// Set Up validation middleware
app.use(validationManager.provideDefaultValidator());
this._passport = require('passport');
////-------------------swagger-------------------//
var swaggerJSDoc = require('swagger-jsdoc');
if (global.config.server.PORT === 3000) {
    var host = 'localhost:' + global.config.server.PORT;
} else {
    var host = 'webrexstudio.com:' + global.config.server.PORT;
}
//swagger swaggerDefinition
var swaggerDefinition = {
    info: {
        title: 'Welcome to Zeepzoop API Document',
        version: '1.0.0',
        description: 'Using this doc you may understand the functionality and test the ZeepZoop RESTful APIs. We developed Some webservices so far and it is growing.',
    },
    host: host,
    basePath: '/'
};

var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./app/swagger/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/api.json', function (req, res) {
    //   res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept-Language, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Content-Type', 'application/json');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else
        next();
});

var expressValidator = require('express-validator');
//the app use part
app.use(expressValidator({
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                default:
                    return false;
            }
        },
        isOneTrue: function (value, bool1, bool2) {
            if ((bool1 || bool2) && !(bool1 && bool2)) {
                return true;
            }
            return false;
        },
        isOneOfTwoTrue: function (value, bool1, bool2) {
            if ((bool1 || bool2)) {
                return true;
            }
            return false;
        },
        checkNumberRange: function (value, inputNumber, min, max) {
            if ((inputNumber >= min) && (inputNumber <= max)) {
                return true;
            }
            return false;
        },
        checkDateValidity: function (value, startDate, endDate) {
            var startDate = new Date(startDate)
            startDate.setDate(startDate.getDate() + 1)
            var endDate = new Date(endDate)
            endDate.setDate(endDate.getDate() + 1)
            var currentDate = new Date()
            if (startDate > currentDate && endDate > currentDate && startDate <= endDate) {
                return true;
            }
            return false;
        },
        checkLength: function (value, str, min) {
            if (str.length < min) {
                return false;
            }
            return true;
        }
    }
}));
app.get('/swagger', function (req, res) {
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname + '/swagger/api-docs/index.html'));
});
// app.get('/auth/facebook', this._passport.authenticate('facebook', {

//     scope: ['public_profile', 'email']
// }));

app.post('/save', function(req,res){
	let data = req.body;	
	getWallet(data.user_id).then(function(resp){
		//main amount minus wallet amout
			let wallet_minus_amount = (Math.round(resp.wallet_total_amount * data.cashback_add_to_wallet_percentage) / 100);
			let obj = {
				"amount" : data.amount,
				"user_id" : data.user_id,
				"cashback_deduction_percentage" : data.cashback_deduction_percentage,
				"cashback_add_to_wallet_percentage" : data.cashback_add_to_wallet_percentage,
				"cashback_amount" : wallet_minus_amount,
				"description" : (wallet_minus_amount > 0) ? "Cashback Amount" : "Initial Amount",
				"flag": false 
			}
			//deduction amount save into database
			saveWallet(obj).then(function(walletResp){
				console.log("deduction amount save into wallet : ",walletResp);
				let paid_amout = (data.amount - wallet_minus_amount);
				let user_cashback_amount = (Math.round(paid_amout * data.cashback_deduction_percentage) /100);
				
				// record store into database
				saveProduct(data).then(function(productResp){
					console.log("called save method",productResp);
					
					var newCashbackObj = {
						"amount" : data.amount,
						"paid_amount" : paid_amout,
						"user_id" : data.user_id,
						"cashback_deduction_percentage" : data.cashback_deduction_percentage,
						"cashback_add_to_wallet_percentage" : data.cashback_add_to_wallet_percentage,
						"cashback_amount" : user_cashback_amount,
						"description" : "cashback Amount",
						"flag": true 
					}
					//new cashback amount save into database
					saveWallet(newCashbackObj).then(function(resp){
                        // res.send(resp);
                        var respData = {
                            data : productResp,
                            status:1,
                            message : "Successful!"
                        }
                        res.send(respData);
					}).catch(function(err){
						console.log("save product error",err);
						res.status(403).send(err);
					});
				}).catch(function(err){
					console.log("save product error",err);
					res.status(403).send(err);
				});

			}).catch(function(err){
				console.log("save wallet error",err);
				res.status(403).send(err);
			});
	});
});
app.post('/wallet', function(req,res){
	let data = req.body;	
	saveWallet(data).then(function(resp){
        console.log("called save method",resp);
        var respData = {
            data : resp,
            status:1,
            message : "Successful!"
        }
		res.send(respData);
	}).catch(function(err){
		console.log("save wallet error",err);
		res.status(403).send(err);
	});

});

app.post('/getwallet', function(req,res){
	let data = req.body;	
	getWallet(data.user_id).then(function(resp){
        console.log("called save method",resp);
        res.send(resp);
	})

});

function saveProduct(data){
	return new Promise((resolve, reject) => {
		
		const product = new ProductModel(data);

		product.save()
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
	});
}

function saveWallet(data){
	return new Promise((resolve, reject) => {
		
		const wallet = new WalletModel(data);

		wallet.save()
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
	});
}

function getWallet(userId){
	return new Promise((resolve, reject) => {
		WalletModel.find({user_id : userId}).then(function(data){
			if(data.length > 0){
				let wallet_total_amount = 0;
				for(var i = 0; i < data.length; i ++){
					if(data[i].flag == true){
						wallet_total_amount = wallet_total_amount + data[i].cashback_amount;
					}
					if(data[i].flag == false){
						wallet_total_amount = wallet_total_amount - data[i].cashback_amount;
					}
				}
				var dataObj = {
					data: data,
					wallet_total_amount: wallet_total_amount
				}
				resolve(dataObj);
			}else{
				var dataObj = {
					data: [],
					wallet_total_amount: 0
				}
				resolve(dataObj);
			}
			
		}).catch(err => {
            reject(err);
        });
	});
}

/* Nirav Raval Code Here 12-07-2019 END*/

function GetWalletBalance(data){
    console.log(data);
    new Promise(function(resolve, reject){
    WalletCalculation.find({})
    .then((item)=>{
        console.log("get result",item);
        resolve(item);
    })
    .catch((err)=>{
    console.log(err);
    reject(err);
    })
});


}





var http = require('http');
var serverExpress = http.createServer(app)
app.use(express.static(__dirname + '/swagger'));
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/', routes);
var server = app.listen(global.config.server.PORT, function () {
    console.log(process.env.NODE_ENV, process.env.PORT, config.db.MONGO_CONNECT_URL);
    console.log('App is running on ' + global.config.server.PORT);
});

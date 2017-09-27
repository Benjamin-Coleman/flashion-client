// var User = require('../models/user')

// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

// //Connect to the database
// mongoose.connect('mongodb://flashion:flatiron@ds149124.mlab.com:49124/flashion');

// var urlencodedParser = bodyParser.urlencoded({extended: false});

// module.exports = function(app){

// 	app.post('/signup', urlencodedParser, function(req, res){
// 		//get data from view and add it to mongodb
// 		var newUser = User(req.body, UserSchema).save(function(err, data){
// 			if (err) throw err;
// 			res.json(data);
// 		})
// 	});

// };
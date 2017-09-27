var express = require('express');
var passport = require('passport')
require('../config/passport')(passport)
var jwt = require('jsonwebtoken')
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var User = require('../models/user')

// mongoose.connect('mongodb://flashion:flatiron@ds149124.mlab.com:49124/flashion');

// var usertestSchema = new mongoose.Schema({
// 	username: String,
// 	password: String
// })

// var UserTest = mongoose.model('UserTest', usertestSchema)

// var urlencodedParser = bodyParser.urlencoded({extended: false});

// router.get("/test", function(req, res){
// 	console.log("API")
// 	res.json({message: "Hello World"})
// })


// router.post('/signup', passport.authenticate('local-signup', {
//             successRedirect : '/profile', // redirect to the secure profile section
//             failureRedirect : '/signup', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
// }));

router.post('/signup', function(req, res){
	console.log('body:', req.body, 'un', req.body.username)
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	// validation stuff later
	var newUser = new User({
		email: email,
		username: username,
		password: password
	})

	User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
	console.log('signup route', req.body)

	res.json({username: username})

})

router.get('/currentuser', passport.authenticate('jwt', { session: false}), function(req, res) {
	console.long('current from api routes')
  res.json({user_id: req.user._id, email: req.user.local.email})
})


router.post('/login', passport.authenticate('local-login'), function(req, res, next) {
  console.log(req.user)
  var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
  res.json({succes:true, user: req.user._id, jwt: token})
});


module.exports = router;
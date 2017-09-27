var express = require('express');
var passport = require('passport')
require('../config/passport')(passport)
// var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken')
var router = express.Router();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose')
// var User = require('../models/user')

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



// // Below works but without setting a JWT

// router.post('/signup', function(req, res){
// 	console.log('request body:', req.body, 'un', req.body.username)
// 	var email = req.body.email;
// 	var username = req.body.username;
// 	var password = req.body.password;

// 	// validation stuff later
// 	var newUser = new User({
// 		email: email,
// 		username: username,
// 		password: password
// 	})

// 	User.createUser(newUser, function(err, user){
// 			if(err) throw err;
// 			console.log(user);
// 		});
// 	console.log('signup route', req.body)

// 	res.json({username: username})

// })

// router.get('/currentuser', passport.authenticate('jwt', { session: false}), function(req, res) {
// 	console.log('current from api routes')
//   res.json({user_id: req.user._id, email: req.user.local.email})
// })


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//    User.getUserByUsername(username, function(err, user){
//    	if(err) throw err;
//    	if(!user){
//    		return done(null, false, {message: 'Unknown User'});
//    	}

//    	User.comparePassword(password, user.password, function(err, isMatch){
//    		if(err) throw err;
//    		if(isMatch){
//    			return done(null, user);
//    		} else {
//    			return done(null, false, {message: 'Invalid password'});
//    		}
//    	});
//    });
//   }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });

// router.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     res.json({success: 'successful login'});
//   });

router.post('/signup', passport.authenticate('local-signup', {
            failureFlash : true // allow flash messages
}), function(req, res) {
	res.json({ success: 'Signed up'})
});

router.get('/currentuser', passport.authenticate('jwt', { session: false}), function(req, res) {
  res.json({user_id: req.user._id, email: req.user.local.email})
})


router.post('/login', passport.authenticate('local-login'), function(req, res, next) {
  console.log(req.user)
  var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
  res.json({succes:true, user: req.user._id, jwt: token})
});


module.exports = router;
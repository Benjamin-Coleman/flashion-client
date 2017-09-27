var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
// require('../config/passport')(passport)
var LocalStrategy = require('passport-local').Strategy
var jwt = require('jsonwebtoken')


/* GET users listing. */
router.get('/', passport.authenticate('jwt'), function(req, res, next) {
  console.log("users")
  User.find({}, (err, docs) => {
    res.json(docs)
  })
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json({success: 'successful login'});
  });





module.exports = router
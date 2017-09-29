var express = require('express');
var passport = require('passport')
require('../config/passport')(passport)
var jwt = require('jsonwebtoken')
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user')
var Lookbook = require('../models/lookbook')
var Style = require('../models/style')
var Product = require('../models/product')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/lookbooks/:id/edit', urlencodedParser, function(req, res) {
	console.log('UPDATING LOOKBOOK', req.body)
	// Lookbook.findByIdAndUpdate(req.params._id, { $set: {styles: {color1: 'req.body.customizations.color1'}}}, { new: true }, function(err, lb){
	// 	if (err) return err;
	// 	res.json({ success: 'updated'})
	// })
	Lookbook.findById(req.params.id, function(err, doc) {
		console.log(req.params.id, '< ID', doc)
		if (err) return err;
		// doc.styles.push({ color1: req.body.customizations.color1})
		doc.styles = {
			color1: req.body.lookbook.styles.color1
		}
		doc.markModified('i dunno')
		doc.save(function(err, lb){
			if (err) return err;
			res.json({ weDidIt: 'fam'})
		})
	})
})

router.post('/lookbooks/new', urlencodedParser, function(req, res) {
	// var lookbook = req.body.data
	console.log(req.body)
	var newLookbook = new Lookbook({
		template: req.body.data.lookbook.template,
		brandName: req.body.data.lookbook.brandName,
		collectionName: req.body.data.lookbook.collectionName,
		products: req.body.data.lookbook.products,
		styles: req.body.data.lookbook.customizations
	})
	newLookbook.save().then(function() {
		User.findOne({ _id: req.body.user}).then(function(record){
			record.local.lookbooks.push(newLookbook)
			record.save().then(function(x){
				res.json(newLookbook)
			})
			
		})
	})
	// newLookbook.save().then(function() {
	// 	console.log('new lookbook saved...moving onto find')
	// 	User.findOne({ _id: req.body.data.user}).then(function(record){
	// 		record.local.lookbooks.push({newLookbook})
	// 		record.save().then(function() {
	// 			res.json({ record })
	// 		}).catch(err=> console.log(err))
	// 	})
	// })

})

router.get('/lookbooks/:id', function(req, res) {
	const lookbookId = req.params.id
	console.log('FETCHING LOOKBOOK ID:', lookbookId)
	Lookbook.findById(lookbookId).then(function(lookbook){
		console.log(lookbook)
		res.json({ lookbook })
	})
})

router.post('/signup', passport.authenticate('local-signup', {
            failureFlash : true // allow flash messages
}), function(req, res) {
	console.log(req.user)
	var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
	res.json({ success: 'Signed up', user: req.user, jwt: token})
});

router.get('/currentuser', passport.authenticate('jwt', { session: false}), function(req, res) {
	console.log('HIT CURRENT USER ROUTE', req.user)
  res.json({id: req.user._id, username: req.user.local.username, lookbooks: req.user.local.lookbooks})
})

//working login

// router.post('/login', passport.authenticate('local-login', { failureFlash: true }), function(req, res, next) {
//   console.log(req.user)
//   var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
//   res.json({success:true, user: req.user._id, jwt: token})
// });

// login with error handling

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({errors: "Invalid username or password"}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
  console.log('USER LOGGIN IN IS: ', req.user)
      var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
      return res.json({user: user, success: 'Good login', jwt: token});
    });
  })(req, res, next);
});


module.exports = router;
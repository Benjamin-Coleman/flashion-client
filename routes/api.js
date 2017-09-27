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


router.post('/lookbooks/new', urlencodedParser, function(req, res) {
	// var lookbook = req.body.data
	console.log(req.body)
	var newLookbook = new Lookbook({
		template: req.body.data.templateId,
		brandName: req.body.data.userInput.brandName,
		collectionName: req.body.data.userInput.collectionName,
		products: req.body.data.userInput.products,
		styles: req.body.data.customizations
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

router.get('/lookbooks/:id', urlencodedParser, function(req, res) {
	const lookbookId = req.params.id
	console.log('FETCHING LOOKBOOK ID:', lookbookId)
	Lookbook.findById(lookbookId).then(function(record){
		res.json({ record })
	})
})

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
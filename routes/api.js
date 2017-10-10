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
		if (err) return err;
		// doc.styles.push({ color1: req.body.customizations.color1})
		doc.products = req.body.lookbook.products
		doc.styles = {
			color1: req.body.lookbook.styles.color1,
			opacity: req.body.lookbook.styles.opacity,
			imageGrayscale: req.body.lookbook.styles.imageGrayscale,
			imageAppearDuration: req.body.lookbook.styles.imageAppearDuration,
			infoAppearDuration: req.body.lookbook.styles.infoAppearDuration,
			fontFamily: req.body.lookbook.styles.fontFamily
		}
		doc.markModified('mod')
		doc.save(function(err, lb){
			if (err) return err;
			res.json({ weDidIt: 'fam'})
		})
	})
})

router.post('/lookbooks/new', urlencodedParser, function(req, res) {
	// var lookbook = req.body.data
	console.log('NEW LOOKBOOK: ', req.body.data, req.body.user)
	var newLookbook = new Lookbook({
		template: req.body.data.lookbook.template,
		brandName: req.body.data.lookbook.brandName,
		collectionName: req.body.data.lookbook.collectionName,
		products: req.body.data.lookbook.products,
		styles: req.body.data.lookbook.styles
	})
	newLookbook.save().then(function() {
		User.findOne({ _id: req.body.user}).then(function(record){
			record.local.lookbooks.push(newLookbook)
			record.save().then(function(x){
				res.json(newLookbook)
			})
			
		})
	})
})

// change to RESTful (.delete to /lookbooks/:id)
router.post('/lookbooks/:id/delete', function(req, res) {
	const lookbookId = req.params.id
	console.log('USER', req.body.userId, 'LOOKBOOKID', lookbookId)


	// delete LB 
	// then delete reference in User
	Lookbook.findByIdAndRemove(lookbookId).then(
	User.findOne({ _id: req.body.userId}).then(function(record){
		record.local.lookbooks = record.local.lookbooks.filter((x, i) => x._id != lookbookId)
		record.save()
		res.json({id: record.local._id, username: record.local.username, lookbooks: record.local.lookbooks})
	})
	)

	// Lookbook.findByIdAndRemove(lookbookId).then(res.json({ removed: 'removed the lookbook with remove method'}))
	// User.findOne({ _id: req.body.userId}).then(function(record){
	// 	console.log(record)
	// 	record.save()
	// })

	// Lookbook.findByIdAndRemove(lookbookId).then(User.findOne({ _id: req.body.user}).then(function(record){
	// 		record.local.lookbooks.pull({ _id: lookbookId })
	// 		record.save().then(function(x){
	// 			res.json(record)
	// 		})
			
	// 	})
	// )

	// User.findOne({ _id: req.body.userId}).then(function(record){
	// 	console.log(record)
	// 		record.local.lookbooks.pull({ _id: lookbookId})
	// 		record.save(function(err, data){
	// 			if (err) console.log(err);
	// 		})
	// 		res.json({ record })
	// 	})

	// User.findOne({ _id: req.body.userId}).then(function(record){
	// 	console.log(record)
	// 	record.local.lookbooks.id(lookbookId).remove()
	// 	record.save(function(err) {
	// 		if (err) {console.log('!&@#($!&@#$(!&@#$(!@#&$(')};
	// 		console.log('removed********')
	// 	})
	// }).then(res.json({success: 'ajskdlfjadsf'}))
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
            failureFlash : true
}), function(req, res) {
	var token = jwt.sign({ user_id: req.user._id }, 'learnlovecode')
	res.json({ success: 'Signed up', user: req.user, jwt: token})
});

router.get('/currentuser', passport.authenticate('jwt', { session: false}), function(req, res) {
  res.json({id: req.user._id, username: req.user.local.username, lookbooks: req.user.local.lookbooks})
})

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
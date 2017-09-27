var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
require('../config/passport')(passport)
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', passport.authenticate('jwt'), function(req, res, next) {
  console.log("users")
  User.find({}, (err, docs) => {
    res.json(docs)
  })
});





module.exports = router
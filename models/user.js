var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

var UserSchema = new Schema({
  local: {
    email: String,
    password: String,
    username: String
  }
})

// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password)
// }


// module.exports = mongoose.model('User', UserSchema)

var User = module.exports = mongoose.model('User', UserSchema);

// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback);
// 	    });
// 	});
// }

module.exports.createUser = function(newUser, callback) {
	var hashed = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8), null)
	newUser.password = hashed
	newUser.save(callback)
}

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
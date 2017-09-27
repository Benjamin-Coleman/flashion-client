var mongoose = require('mongoose')
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
	imageURL: String,
	description: String,
	URL: String,
	name: String
})

// just export schema

module.exports = ProductSchema

// module.exports = mongoose.model('Product', ProductSchema)
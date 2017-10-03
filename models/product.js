var mongoose = require('mongoose')
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
	imageURL: String,
	description: String,
	URL: String,
	name: String,
	imagePositionX: { type: Number, default: 0 },
	infoPositionX: { type: Number, default: 0 },
	infoPositionY: { type: Number, default: 0 }
})

// just export schema

module.exports = ProductSchema

// module.exports = mongoose.model('Product', ProductSchema)
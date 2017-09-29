var mongoose = require('mongoose')
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

var ProductSchema = require('./product')
var StylesSchema = require('./style')

const LookbookSchema = new Schema({
	template: Number,
	brandName: String,
	collectionName: String,
	products: [ProductSchema],
	styles: {}
})


module.exports = mongoose.model('Lookbook', LookbookSchema)
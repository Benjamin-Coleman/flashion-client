// currently not in use. Use this if change to array of objects

var mongoose = require('mongoose')
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

const StyleSchema = new Schema({
	color1: ''
})

// just export schema

module.exports = StyleSchema

// module.exports = mongoose.model('Style', StyleSchema)
let mongoose = require('mongoose')
let Post = require('../models/post')

require('songbird')

let BlogSchema = mongoose.Schema({
	
	title: {
	type:String,
	required:true	
	},
	description: {
	type:String,
	required:true	
	},
	userId: {
	type:String,
	required:true	
	},
	posts:[Post],
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Blog', BlogSchema)
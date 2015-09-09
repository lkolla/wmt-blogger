let mongoose = require('mongoose')

require('songbird')

let PostSchema = mongoose.Schema({
	title: {
	type:String,
	required:true	
	},
	content: {
	type:String,
	required:true	
	},
	image: {
	type:String,
	required:true	
	},
	userId: {
	type:String,
	required:true	
	},	
	blogId: {
	type:String,
	required:true	
	},	
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)
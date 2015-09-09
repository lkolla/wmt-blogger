let mongoose = require('mongoose')

require('songbird')

let CommentSchema = mongoose.Schema({
    comments      :  {
	type:String,
	required:true	
	},
    userId: {
	type:String,
	required:true	
	},
	postId: {
	type:String,
	required:true	
	},		
    createdDate : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', CommentSchema)
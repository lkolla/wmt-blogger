//Profile Model contains following properties.
// userName 
// password
// email
// firstName
// lastName
// url

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
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)
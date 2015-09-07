//Profile Model contains following properties.
// userName 
// password
// email
// firstName
// lastName
// url

let mongoose = require('mongoose')

require('songbird')

let UserSchema = mongoose.Schema({
	username: {
	type:String,
	required:true	
	},
	password: {
	type:String,
	required:true	
	},
	email: {
	type:String,
	required:true	
	},
	firstname: {
	type:String,
	required:true	
	},
	lastname: {
	type:String,
	required:true	
	},
	blogtitle: String,
	blogdescription: String

})

UserSchema.path('password').validate( (password) => {

	return password.length >= 4 &&  /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
})

module.exports = mongoose.model('User', UserSchema)
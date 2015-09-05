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
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
})

mongoose.connect('mongodb://localhost:27017/authenticator')

module.exports = mongoose.model('User', UserSchema)
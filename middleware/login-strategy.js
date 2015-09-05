let User = require('../models/profile')
let nodeifyit = require('nodeifyit')
let LoginStrategy = require('passport-local').Strategy


module.exports = (app) => {

	let passport = app.passport

	passport.use('local-login', new LoginStrategy(), {
		nodeifyit( async (username, password) => {
			let user = User.promise.findOne({username})

			if(!user || username !== user.username){
				return [false, {message: 'Invalid User Name'}]
			}

			if(!user || password !== user.password){
				return [false, {message: 'Invalid password.'}]
			}

			return user
		}, {spread: true})
	})

}
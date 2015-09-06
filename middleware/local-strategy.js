let User = require('../models/profile')
let nodeifyit = require('nodeifyit')
let LocalStrategy = require('passport-local').Strategy


module.exports = (app) => {

	let passport = app.passport

	passport.serializeUser(nodeifyit(async (user) => user._id))

	passport.deserializeUser(nodeifyit(async (id) => {
		return await User.promise.findById(id)
	}))

	//user login.
	passport.use(new LocalStrategy(
		nodeifyit( async (username, password) => {

			let user = await User.promise.findOne({username})

			if(!user || username !== user.username){
				return [false, {message: 'Invalid User Name'}]
			}

			if(!user || password !== user.password){
				return [false, {message: 'Invalid password.'}]
			}

			return user

		}, {spread: true})))

	//user registration.
	passport.use('local-signup', new LocalStrategy(
		nodeifyit(async(username, password, email, firstname, lastname) => {

			console.log('inside local-signup')

			username = (username || '').toLowerCase()

			console.log(`sername name ${username}`)

			let registeredUser = await User.promise.findOne({username})

			console.log(`registeredUser ${registeredUser}`)

			if(registeredUser){
				return [false, {message: 'User already exist.'}]
			}

			let user = new User()

			user.username = username
			user.password = password
			user.email = email
			user.firstName = firstname
			user.lastName = lastname


			return await user.save()

		}, {spread: true})))
		

}
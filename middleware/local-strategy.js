let User = require('../models/profile')
let nodeifyit = require('nodeifyit')
let LocalStrategy = require('passport-local').Strategy
let util = require('util')
let validator = require('validator')

module.exports = (app) => {

	let passport = app.passport

	passport.serializeUser(nodeifyit(async (user) => user._id))

	passport.deserializeUser(nodeifyit(async (id) => {
		return await User.promise.findById(id)
	}))

	//user login.
	passport.use(new LocalStrategy(
		nodeifyit( async (username, password) => {

			username = (username || '').toLowerCase()

			if(!validator.isAlphanumeric(username)){
				return [false, {message: 'only alphabets and numbers are allowed for user name'}]
			}

			let user = null

			if(validator.isEmail(username)){
				console.log('inside email logic')
				user = await User.promise.findOne({email: username, password: password})
			}else{
				console.log('inside username logic')
				user = await User.promise.findOne({username:username, password: password})
			}
			
			if(!user){
				return [false, {message: 'Invalid user name / password'}]
			}

			return user

		}, {spread: true})))

	//user registration.
	passport.use('local-signup', new LocalStrategy(
		{failureFlash:true, passReqToCallback:true},
		nodeifyit(async(req, username, password) => {

			let{email, firstname, lastname, title, description} = req.body

			username = (username || '').toLowerCase()

			let registeredUser = await User.promise.findOne({username:username})

			//checking if an user exists with email?
			if(!registeredUser){
				registeredUser = await User.promise.findOne({email:email})
			}

			if(registeredUser){
				return [false, {message: 'User name / email already exist'}]
			}

			let user = new User()

			user.username = username.toLowerCase()
			user.password = password
			user.email = email.toLowerCase()
			user.firstname = firstname
			user.lastname = lastname
			user.blogtitle = title
			user.blogdescription = description

			try{
				return await user.save()	
			}catch(e){
				console.log(util.inspect(e))
				return [false, {message: e.message}]
			}
		}, {spread: true})))
		

}
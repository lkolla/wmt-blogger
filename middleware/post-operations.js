let Post = require('../models/post')
let nodeifyit = require('nodeifyit')
let util = require('util')
let validator = require('validator')

module.exports = {

	addPost: (req, res, next) => {
		async ()=> {
			console.log('inside addPost')
			console.log(req.body.title, req.body.content, req.body.image)

			let post = new Post()
			post.title = req.body.title
			post.content = req.body.content
			post.image = req.body.image

			try{
				console.log('before')
				return await post.save()	
				console.log('after')
			}catch(e){
				console.log(util.inspect(e))
				return [false, {message: e.message}]
			}

			next()
		}().catch(next)},
	modifyPost:(req, res, next) => {
			
				next()
			}		
}
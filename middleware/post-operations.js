let Post = require('../models/post')
let nodeifyit = require('nodeifyit')
let util = require('util')
let validator = require('validator')

module.exports = {

	addPost: (req, res, next) => {
		async ()=> {
			console.log('inside addPost')
			console.log(req.body.title, req.body.content, req.body.image)

			let blogPost = new Post()

			blogPost.title = req.body.title
			blogPost.content = req.body.content
			blogPost.image = req.body.image

			console.log(blogPost)

			try{
				console.log('before')
				return await blogPost.save()	
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
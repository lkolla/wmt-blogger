let Post = require('../models/post')
let Blog = require('../models/blog')
let User = require('../models/profile')
let nodeifyit = require('nodeifyit')
let util = require('util')
let validator = require('validator')

module.exports = {

	addPost: (req, res, next) => {
			
			console.log(req.body.title, req.body.content, req.body.image)

			let blogPost = new Post()

			blogPost.title = req.body.title
			blogPost.content = req.body.content
			blogPost.image = req.body.image

			console.log(blogPost)

			try{
				blogPost.save()	
			}catch(e){
				console.log(util.inspect(e))
			}

			next()
		},
	modifyPost:(req, res, next) => {
			
				next()
	},
	addBlog: (req, res, next) => {

			console.log(req.body.title, req.body.description, req.body.userId)

			let blog = new Blog()

			blog.title = req.body.title
			blog.description = req.body.description
			blog.userId = req.body.userId

			console.log(blog)

			try{
				blog.save(console.log('blog created'))	
			}catch(e){
				console.log(util.inspect(e))
			}

			req.blogId = blog._id

			next()

	},
	findBlog: (req, res, next) => {

		async () =>{

			let blog = await Blog.promise.findById(req.params.blogId)
			let user = await User.promise.findById(blog.userId)

			req.blog = blog
			req.blogCreator = user

			next()

		}().catch(next)

	}	

}
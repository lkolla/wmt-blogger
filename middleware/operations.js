let Post = require('../models/post')
let Blog = require('../models/blog')
let User = require('../models/profile')
let Comment = require('../models/comment')
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
			blogPost.userId = req.body.userId
			blogPost.blogId = req.body.blogId


			console.log(blogPost)

			try{
				blogPost.save(console.log('post saved'))	
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
			req.posts = await Post.promise.find({blogId:req.params.blogId})

			req.blog = blog
			req.blogCreator = user

			next()

		}().catch(next)

	},
	addComment: (req, res, next) => {

		async () =>{

			
			let comment = new Comment()

			comment.comments = req.body.comments
			comment.userId = req.body.userId
			comment.postId = req.body.postId
			await comment.save()

			next()

		}().catch(next)

	},	
	findPost: (req, res, next) => {

		async () =>{

			console.log(req.params.postId)

			req.post = await Post.promise.findById(req.params.postId)

			req.comments = await Comment.promise.find({postId:req.params.postId})

			next()

		}().catch(next)

	},
	deletePost: (req, res, next) => {

		async () =>{

			console.log(req.params.postId)

			await Post.promise.findByIdAndRemove({ _id: req.params.postId})
			
			next()

		}().catch(next)

	},
	savePost: (req, res, next) => {

		async () =>{

			let blogPost = await Post.promise.findById(req.params.postId)

			blogPost.title = req.body.title
			blogPost.content = req.body.content
			blogPost.image = req.body.image
			blogPost.userId = req.body.userId

			await blogPost.save(console.log('post saved'))	

			next()

		}().catch(next)

	},
	findBlogsAndPosts: (req, res, next) => {

		async () =>{

			req.blogs = await Blog.promise.find({userId:req.user._id})
			//console.log(req.blogs)
			req.posts = await Post.promise.find({userId:req.user._id})
			//console.log(req.blogs)
			req.comments = await Comment.promise.find({userId:req.user._id})
			//console.log(req.blogs)

			next()

		}().catch(next)

	}		

}
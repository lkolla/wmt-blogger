// following module holds all the http routes

let Operations = require('./middleware/operations')

module.exports = (app) => {

let passport = app.passport

//Following contain all the routes.

app.get('/', (req, res) => {

	res.render('login.ejs', {message:req.flash('error')})

}) // '/' route end.

app.get('/login', (req, res) => {
	res.render('login.ejs', {message:req.flash('error')})
}) // '/login' get route end.

app.post('/login', passport.authenticate('local', {
	successRedirect:'/profile',
	failureRedirect:'/login',
	failureFlash:true
}))  // '/login' route end.

app.get('/signup',  (req, res) => {
	res.render('signup.ejs', {message:req.flash('error')})
}) // '/signup' route end.

app.post('/signup',  passport.authenticate('local-signup', {
	successRedirect:'/profile',
	failureRedirect:'/signup',
	failureFlash:true
})) // '/adduser' route end.

app.get('/blogpost/:blogId',  (req, res) => {
	res.render('post.ejs', {
		user:req.user,
		blogId:req.params.blogId,
		message:req.flash('error')})
}) // '/blogpost' route end.


app.post('/blogpost', Operations.addPost, (req, res) => {

	res.redirect(`/profile`);

}) // '/blogpost' route end.

app.get('/editpost/:postId', Operations.findPost, (req, res) => {

	res.render('editpost.ejs', {
		user:req.user,
		post:req.post,
		comments:req.comments,
		image:req.image,
		message:req.flash('error')})

}) // '/blogpost' route end.

app.get('/deletepost/:postId', Operations.deletePost, (req, res) => {

	res.redirect(`/profile`)

}) // '/blogpost' route end.

app.post('/editpost/:postId', Operations.savePost, (req, res) => {

	res.redirect(`/profile`)

}) // '/blogpost' route end.

app.post('/addcomment', Operations.addComment, (req, res) => {

	res.redirect(`/editpost/${req.body.postId}`)

}) // '/blogpost' route end.



app.get('/createblog',  (req, res) => {
	res.render('createblog.ejs', {
		user:req.user,
		message:req.flash('error')
	})
}) // '/createblog' route end.

app.post('/createblog', Operations.addBlog,  (req, res) => {

	console.log(req.blogId)

	res.redirect(`/blog/${req.blogId}`);
}) // '/createblog' route end.

app.get('/blog/:blogId', Operations.findBlog,  (req, res) => {
	res.render('blogdetails.ejs', {
		user:req.user,
		blogCreator:req.blogCreator,
		blog:req.blog,
		posts:req.posts,
		message:req.flash('error')
	})
}) // '/createblog' route end.


app.get('/profile', Operations.findBlogsAndPosts, (req, res) => {
	res.render('profile.ejs', {
		user:req.user,
		blogs:req.blogs,
		posts:req.posts,
		comments:req.comments,
		message:req.flash('error')
	})
})

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})



}//module.exports end.

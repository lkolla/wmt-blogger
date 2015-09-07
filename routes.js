// following module holds all the http routes

let PostOperations = require('./middleware/post-operations')

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

app.get('/blogpost',  (req, res) => {
	res.render('post.ejs', {message:req.flash('error')})
}) // '/signup' route end.

app.post('/blogpost', PostOperations.addPost,  (req, res) => {
	res.render('post.ejs', {message:req.flash('error')})
}) // '/signup' route end.

app.get('/profile', (req, res) => {
	res.render('profile.ejs', {
		user:req.user,
		message:req.flash('error')
	})
})

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})



}//module.exports end.

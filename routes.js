// following module holds all the http routes

module.exports = (app) => {

let passport = app.passport

//Following contain all the routes.

app.get('/', loggingTheRequest, (req, res) => {

	res.render('login.ejs', {})

}) // '/' route end.

app.post('/login', loggingTheRequest, passport.authenticate('local', {
	successRedirect:'/profile',
	failureRedirect:'/',
	failureFlash:true
}))  // '/login' route end.

app.post('/signup', loggingTheRequest, (req, res) => {
	res.render('signup.ejs', {})
}) // '/signup' route end.


app.post('/adduser', loggingTheRequest, passport.authenticate('local-signup', {
	successRedirect:'/profile',
	failureRedirect:'/',
	failureFlash:true
})) // '/adduser' route end.

app.get('/profile', loggingTheRequest, (req, res) => {
	console.log(req.user)
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

function loggingTheRequest(req, res, next){

	console.log(`URL: ${req.url}`)

	//console.log(`UserName: ${req.body.username}`)
	//console.log(`Password: ${req.body.password}`)

	next()
}
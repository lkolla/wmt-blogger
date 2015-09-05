//Walmart Blogger

let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let passport = require('passport')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let LocalStrategy = require('passport-local').LocalStrategy
let nodeifyit = require('nodeifyit')
let flash = require('connect-flash')

//Modules
let routes = require('./routes')
let loginStrategy = require('./middleware/login-strategy')


const HTTP_PORT = process.env.NODE_HTTP_PORT
const ENV = process.env.DROPBOX_ENV

let app = express()
app.passport = passport

//setting the views
app.set('view engine', 'ejs')  

//adding the cookie parser.
app.use(cookieParser('ilovenodejs'))

//body parser middleware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//session middleware.
app.use(session({
	secret:'ilovenodejs',
	resave:true,
	saveUninitialized: true
}))

//passport middleware.
app.use(passport.initialize())
app.use(passport.session())

//adding flash middleware.
app.use(flash())

loginStrategy(app)

routes(app)

app.listen(HTTP_PORT, ()=>{
	console.log(`Blogger server running in ${ENV}`)
	console.log(`Blogger server listening @ http://localhost:${HTTP_PORT}`)
})




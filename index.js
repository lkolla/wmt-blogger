//Walmart Blogger

let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let passport = require('passport')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let nodeifyit = require('nodeifyit')
let flash = require('connect-flash')

//Modules
let routes = require('./routes')
let localStrategy = require('./middleware/local-strategy')


const HTTP_PORT = process.env.NODE_HTTP_PORT
const ENV = process.env.DROPBOX_ENV

let app = express()

if(ENV === 'development'){
	app.use(morgan('dev'))
}

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

localStrategy(app)

routes(app)

app.listen(HTTP_PORT, ()=>{
	console.log(`Blogger server running in ${ENV}`)
	console.log(`Blogger server listening @ http://localhost:${HTTP_PORT}`)
})




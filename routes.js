// following module holds all the http routes
module.exports = (app) => {

//Following contain all the routes.

app.get('/', (req, res) => {

	res.render('index.ejs', {})

}) // '/' route end.



}//module.exports end.
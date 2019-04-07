var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var footer_and_headers_midds = require('./middlewares/footer_and_header.js');

var appl = express();
var urlencodedParser = bodyParser.urlencoded({extended:false});

appl.set('view engine', 'ejs');

appl.use(express.static('public'));

appl.get('/', (req, res) => {
	res.render(__dirname + '/views/home.ejs');
});

appl.get('/posts_and_contents', (req, res) => {
	res.render(__dirname + '/views/posts_and_contents.ejs');
});

appl.get('/gallery', (req, res) => {
	res.render(__dirname + '/views/gallery.ejs');
});

appl.get('/about_us', (req, res) => {
	res.render(__dirname + '/views/about_us.ejs');
});

appl.get('/informations', (req, res) => {
	res.render(__dirname + '/views/informations.ejs');
});

/*generic requests*/
appl.post('/newsletter_submission', urlencodedParser, footer_and_headers_midds.newsletter_verification, (req, res) => {
	res.send("email_validated_successfuly");
});
/*generic requests*/
appl.listen((process.env.PORT || 12555), function(){
	// setInterval(function(){
	// 	request.get('https://mbah-test.herokuapp.com/imgs/home/jiefangbei.jpg');
	// }, 600000);
	console.log("ZeroTwo");
});

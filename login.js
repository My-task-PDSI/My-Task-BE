var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '81277593',
	database : 'mytask'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/registro', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/registro.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/register', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var name = request.body.name;
	var email = request.body.email;
	if (username && password) {
		connection.query('INSERT INTO usuarios(name,username,password,email) VALUES(?,?,?,?)', [name, username, password, email], function(error, results) {
			if (!error) {
				console.log('User added')
				response.redirect('/');
			} else {
				response.send('Error at registration!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter all credentials!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);
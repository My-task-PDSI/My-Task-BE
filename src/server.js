var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController")
const groupController = require("./controllers/groupController")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
  });

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/auth', userController.login)

app.post('/signup', userController.signup)
app.delete('/signup', userController.deleteUser)

app.post('/task-groups', groupController.create)
app.get('/task-groups', groupController.readAll) // MOSTRAR TODOS OS GRUPOS CADASTRADOS
app.get('/task-groups/:idGroup', taskController.readAll) // MOSTRAR TODAS AS TASKS DE UM GRUPO

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);
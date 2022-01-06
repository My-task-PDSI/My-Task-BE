const express = require('express');
const session = require('express-session');
const taskRouter = require('./routers/task');
const taskGroupRouter = require('./routers/taskGroup');
const userRouter = require('./routers/user');
const indexRouter = require('./routers');
const cors = require('cors');
//const cors = require('./middlewares/cors');

const app = express();

app.use(cors({
	origin:'http://localhost:8080'
}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/task-groups', taskGroupRouter);

app.listen(3000);
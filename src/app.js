const express = require('express');
const session = require('express-session');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const taskRouter = require('./routers/task');
const taskGroupRouter = require('./routers/taskGroup');
const userRouter = require('./routers/user');
const indexRouter = require('./routers');
const notifications = require('./services/notification');

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

const server = http.Server(app);
const socketIO = io(server,{
	cors: {
    origin: 'http://localhost:8080',
    credentials: true
  }
});

const socketArray = {};

socketIO.on('connection', function(socket){

  socket.on('open', function(idUser){
		socketArray[idUser] = socket;
  });

});
socketIO.on('disconnect', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
server.listen(3000, function(){
	notifications.start(socketArray);
  console.log('Servidor rodando em: http://localhost:3000');
});
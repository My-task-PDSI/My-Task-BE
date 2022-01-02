const mysql = require("mysql")

var database = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'admin123',
	database : 'mytask'
});

database.connect(async function (error) {
	if (error) {
		throw error
	}
	var createUsers = `CREATE TABLE IF NOT EXISTS users (
							idUser int primary key auto_increment, 
							name VARCHAR(30), 
							username VARCHAR(20), 
							email VARCHAR(50), 
							password VARCHAR(20)
					   )`

	await database.query(createUsers)

	var createTask_group = `CREATE TABLE IF NOT EXISTS task_group (
								idGroup int primary key auto_increment, 
								idUser int, 
								CONSTRAINT fkUser FOREIGN KEY (idUser) REFERENCES users(idUser),
								title VARCHAR(20),
								description VARCHAR(50),
								creationDate DATETIME
							)`

	await database.query(createTask_group)
	
	var createTasks = `CREATE TABLE IF NOT EXISTS tasks (
							idTask int primary key auto_increment,
							idGroup int,
							CONSTRAINT fkGroup FOREIGN KEY (idGroup) REFERENCES task_group(idGroup),
							title VARCHAR(20),
							description VARCHAR(50),
							creationDate DATETIME,
							updateDate DATETIME
					  )`
	
	await database.query(createTasks)

	var createNotifications = `CREATE TABLE IF NOT EXISTS notifications (
							idNotification int primary key auto_increment,

							idtask int,
							CONSTRAINT fkTask FOREIGN KEY (idTask) REFERENCES tasks(idTask),
							
							message VARCHAR(40),
							viewed BOOL,
							creationDate DATETIME
						 )`

	await database.query(createNotifications)
})

module.exports = database
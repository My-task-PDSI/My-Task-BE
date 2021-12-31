const mysql = require("mysql")

var database = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'admin123',
	database : 'mytask'
});

database.connect()

module.exports = database
const Task = require('./Task');

const TABLE_NAME = 'Notification';

class Notification {
	constructor(database) {
		this.database = database;
		this.isCreated = false;
	}
	async create() {
		if(this.isCreated) return false;
		const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id INT PRIMARY KEY AUTO_INCREMENT,
			idTask INT,
			message VARCHAR(40),
			viewed BOOLEAN DEFAULT FALSE,
			creationDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			upadatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (idTask) REFERENCES ${Task.TABLE_NAME}(id) ON DELETE CASCADE
		 )`;
		this.isCreated = true;
		await this.database.query(sql);
		return true;
	}
}

module.exports = {
	TABLE_NAME,
	model: Notification
}
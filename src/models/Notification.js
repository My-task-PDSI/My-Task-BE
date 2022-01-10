const Task = require('./Task');

const TABLE_NAME = 'Notification';

class Notification {
	constructor(database) {
		this.database = database;
		this.isCreated = false;
	}
	async create() {
		if (this.isCreated) return false;
		const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id INT PRIMARY KEY AUTO_INCREMENT,
			idTask INT,
			idUser INT,
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
	async insert(notification) {
		const { idTask, idUser, message } = notification;
		const sql = `INSERT INTO ${TABLE_NAME}(idTask, idUser, message) VALUES (?, ?, ?)`;
		const result = await this.database.query(sql, [idTask, idUser, message]);
		return result[0];
	}
	async allNotSeen() {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE viewed = FALSE`;
		const result = await this.database.query(sql);
		return result[0];
	}
	async getAll() {
		const sql = `SELECT * FROM ${TABLE_NAME}`;
		const result = await this.database.query(sql);
		return result[0];
	}
	async getAllByIdUser(id) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE idUser = ?`;
		const result = await this.database.query(sql, [id]);
		return result[0];
	}
}

module.exports = {
	TABLE_NAME,
	model: Notification
}
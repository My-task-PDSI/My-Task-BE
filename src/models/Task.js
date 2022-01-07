const TaskGroup = require('./TaskGroup');

const TABLE_NAME = 'Task';

class Task {
	constructor(database) {
		this.database = database;
		this.isCreated = false;
	}
	async create() {
		if (this.isCreated) return false;
		const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
			id INT PRIMARY KEY AUTO_INCREMENT,
			idGroup INT,
			title VARCHAR(20),
			description VARCHAR(50),
			status VARCHAR(50) DEFAULT 'not-completed',
			currentTime DATETIME,
			creationDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			upadatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (idGroup) REFERENCES ${TaskGroup.TABLE_NAME}(id) ON DELETE CASCADE
		)`;
		this.isCreated = true;
		await this.database.query(sql);
		return true;
	}
	async findById(id) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
		const result = await this.database.query(sql, [id]);
		return result[0];
	}
	async insert(task) {
		const { idGroup, title, description, status, currentTime = null } = task;
		const sql = `INSERT INTO ${TABLE_NAME}(idGroup, title, description, currentTime) VALUES (?, ?, ?, ?, ?)`;
		const result = await this.database.query(sql, [idGroup, title, description, status, currentTime]);
		return result[0];
	}
	async update(task) {
		const { id, title, description, status, currentTime = null } = task;
		const sql = `UPDATE ${TABLE_NAME} SET title = ?, description = ?, status = ?, currentTime = ? WHERE id = ?`;
		const result = await this.database.query(sql, [title, description, status, currentTime, id]);
		return result[0];
	}
	async findAllByIdGroup(id) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE idGroup = ?`;
		const result = await this.database.query(sql, [id]);
		return result[0];
	}
	async deleteById(id) {
		const sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;
		const result = await this.database.query(sql, [id]);
		return result[0];
	}
}
module.exports = {
	TABLE_NAME,
	model: Task
}
const User = require('./User');
const TABLE_NAME = 'TaskGroup';

class TaskGroup {
	constructor(database) {
		this.database = database;
		this.isCreated = false;
	}
	async create() {
		if(this.isCreated) return false;
		const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id INT PRIMARY KEY AUTO_INCREMENT, 
			idUser INT, 
			title VARCHAR(20),
			description VARCHAR(50),
			creationDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			upadatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (idUser) REFERENCES ${User.TABLE_NAME}(id) ON DELETE CASCADE
		)`;
		this.isCreated = true;
		await this.database.query(sql);
		return true;
	}
	async insert(taskGroup) {
		const { idUser, title, description } = taskGroup;
		const sql = `INSERT INTO ${TABLE_NAME}(idUser, title, description) VALUES (?, ?, ?)`;
		const result = await this.database.query(sql, [idUser, title, description]);
		return result[0];
	}
	async update(taskGroup) {
		const { id, title, description } = taskGroup;
		const sql = `UPDATE ${TABLE_NAME} SET title = ?, description = ? WHERE id = ?`;
		const result = await this.database.query(sql, [title, description, id]);
		return result[0];
	}
	async deleteById(id) {
		const sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;
		const result = await this.database.query(sql, [id]);
		return result[0];
	}
	async findById(id) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`
		const result = await this.database.query(sql, [id])
		return result[0]
	}
	async findByIdUser(id) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE idUser = ?`
		const result = await this.database.query(sql, [id])
		return result[0]
	}
	async findAll() {
		const sql = `SELECT * FROM ${TABLE_NAME}`;
		const result = await this.database.query(sql);
		return result[0];
	}
}

module.exports = {
	TABLE_NAME,
	model: TaskGroup
}
const TABLE_NAME = 'User';

class User {
	constructor(database) {
		this.database = database;
		this.isCreated = false;
	}
	async create() {
		if (this.isCreated) return false;
		const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id INT PRIMARY KEY AUTO_INCREMENT, 
			name VARCHAR(30), 
			username VARCHAR(20),
			email VARCHAR(50), 
			password VARCHAR(20)
		 )`;
		this.isCreated = true;
		await this.database.query(sql);
		return true;
	}
	async insert(user) {
		const { name, username, password, email } = user;
		const sql = `INSERT INTO ${TABLE_NAME}(name, username, password, email) VALUES(?,?,?,?)`;
		const result = await this.database.query(sql, [name, username, password, email]);
		return result[0];
	}
	async findByNameAndPassword(name, password) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE username = ? AND password = ?`;
		const result = await this.database.query(sql, [name, password]);
		return result[0];
	}
	async findUser(name, username, email) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE name = ? OR username = ? OR email = ?`;
		const result = await this.database.query(sql, [name, username, email]);
		return result[0];
	}
	async findByEmail(email) {
		const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ?`;
		const result = await this.database.query(sql, [email]);
		return result[0];
	}
	async deleteByEmail(email) {
		const sql = `DELETE  FROM ${TABLE_NAME} WHERE email = ?`;
		const result = await this.database.query(sql, [email]);
		return result[0];
	}
	async updateByUsername(username, newName, newPassword, newEmail) {
		const sql = `UPDATE User SET  email = ?, name = ?, password = ?  WHERE username =?`;
		const result = await this.database.query(sql, [newEmail, newName, newPassword, username]);
		return result[0];
	}

}

module.exports = {
	TABLE_NAME,
	model: User
}
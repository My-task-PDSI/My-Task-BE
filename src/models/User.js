const TABLE_NAME = 'User';

const bcrypt = require("bcrypt")
const saltRounds = 10;
const generatedSalt = bcrypt.genSaltSync(saltRounds);

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
      password CHAR(60)
     )`;
    this.isCreated = true;
    await this.database.query(sql);
    return true;
  }
  async insert(user) {
    const { name, username, password, email } = user;
    
    const sql = `INSERT INTO ${TABLE_NAME}(name, username, password, email) VALUES(?,?,?,?)`;
    
    const hash = bcrypt.hashSync(password, generatedSalt);
    
    const result = await this.database.query(sql, [name, username, hash, email]);
    
    return result[0];
      
  }
  async compare(passwordREQ, passwordDB) {
    const isEqual = await bcrypt.compareSync(passwordREQ, passwordDB)

    return isEqual
  }
  async findByUsername(username) {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE username = ?`;
    const result = await this.database.query(sql, [username]);
    return result[0];
  }
  async findUser(name, username, email) {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE name = ? OR username = ? OR email = ?`;
    const result = await this.database.query(sql, [name, username, email]);
    return result[0];
  }

  async findAllUsers() {
    const sql = `SELECT * FROM ${TABLE_NAME}`
    const result = await this.database.query(sql)
    return result[0]
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
  async updateByUsername(username, newName, newEmail) {
    const sql = `UPDATE User SET  email = ?, name = ?  WHERE username =?`;
    const result = await this.database.query(sql, [newEmail, newName, username]);
    return result[0];
  }

}

module.exports = {
  TABLE_NAME,
  model: User
}
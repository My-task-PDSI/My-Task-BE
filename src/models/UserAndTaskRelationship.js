const User = require('./User');
const Task = require('./Task');
const TaskGroup = require('./TaskGroup');
const TABLE_NAME = 'UserAndTaskRelationship';

class UserAndTaskRelationship {
  constructor(database) {
    this.database = database;
    this.isCreated = false;
  }
  async create() {
    if(this.isCreated) return false;
    const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      idUser INT,
      idTask INT,
      idGroup INT,
      creationDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      upadatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (idUser) REFERENCES ${User.TABLE_NAME}(id),
      FOREIGN KEY (idTask) REFERENCES ${Task.TABLE_NAME}(id),
      FOREIGN KEY (idGroup) REFERENCES ${TaskGroup.TABLE_NAME}(id)
    )`;
    this.isCreated = true;
    await this.database.query(sql);
    return true;
  }
  async insert(data) {
    const { idUser, idGroup, idTask } = taskGroup;
    const sql = `INSERT INTO ${TABLE_NAME}(idUser, idGroup, idTask) VALUES (?, ?, ?)`;
    const result = await this.database.query(sql, [idUser, idGroup, idTask]);
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
}

module.exports = {
  TABLE_NAME,
  model: UserAndTaskRelationship
}
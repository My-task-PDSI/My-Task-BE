const User = require('./User');
const TaskGroup = require('./TaskGroup');
const TABLE_NAME = 'UserAndGroupRelationship';

class UserAndGroupRelationship {
  constructor(database) {
    this.database = database;
    this.isCreated = false;
  }
  async create() {
    if(this.isCreated) return false;
    const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INT PRIMARY KEY AUTO_INCREMENT,
      idUser INT,
      idGroup INT,
      typeUser VARCHAR(20) DEFAULT 'convidado',
      creationDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      upadatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (idUser) REFERENCES ${User.TABLE_NAME}(id),
      FOREIGN KEY (idGroup) REFERENCES ${TaskGroup.TABLE_NAME}(id)
    )`;
    this.isCreated = true;
    await this.database.query(sql);
    return true;
  }
  async insert(data) {
    const { idUser, idGroup, typeUser = null } = data;
    const sql = `INSERT INTO ${TABLE_NAME}(idUser, idGroup, typeGroup) VALUES (?, ?, ?)`;
    const result = await this.database.query(sql, [idUser, idGroup, typeUser]);
    return result[0];
  }
  async update(data) {
    const { id, typeUser = null } = data;
    const sql = `UPDATE ${TABLE_NAME} SET typeUser = ? WHERE id = ?`;
    const result = await this.database.query(sql, [typeUser, id]);
    return result[0];
  }
  async findAllUserGroup(idUser) {
    const sql = `SELECT FROM ${TABLE_NAME} WHERE id = ?`;
    const result = await this.database.query(sql, [idUser]);
    return result[0];
  }
  async findAlMembersGroup(idGroup) {
    const sql = `SELECT U.* FROM ${TABLE_NAME} AS R JOIN ${User.TABLE_NAME} as U WHERE R.id = ? AND R.id = U.id`;
    const result = await this.database.query(sql, [idGroup]);
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
  model: UserAndGroupRelationship
}
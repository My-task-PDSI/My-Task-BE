const mysql = require('mysql2/promise')
const config = require('../config');
const TaskModel = require('./Task');
const TaskGroupModel = require('./TaskGroup');
const NotificationModel = require('./Notification');
const UserModel = require('./User');

const models = [UserModel, TaskGroupModel, TaskModel, NotificationModel];
const database = { model: {} };

async function initialize(){
	const connection = await mysql.createConnection(config);
	database.connect = connection;

	database.query = (connection.query).bind(connection);
	
	for(const { TABLE_NAME, model } of models){
		database.model[TABLE_NAME] = new model(database);
		await database.model[TABLE_NAME].create();
	}
}
module.exports = {database,initialize};
const mysql = require('mysql2/promise')
const config = require('./config');
const databaseModule = require('./models/database');

const asyncEvery = async (arr, predicate) => {
	for (const item of arr) {
		if (!await predicate(item)) return false;
	}
	return true;
};
async function createDatabase() {
	const { database, ...localConfig } = config;
	try {
		const connection = await mysql.createConnection(localConfig);

		await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
		console.log(`Result: Database '${database}' is created!`);
	} catch (error) {
		console.log('error: ', error.message)
	}
}
async function dropDatabase() {
	const { database, ...localConfig } = config;
	try {
		const connection = await mysql.createConnection(localConfig);
		await connection.query(`DROP DATABASE IF EXISTS ${database}`);
		console.log(`Result: Database '${database}' is deleted!`);
	} catch (error) {
		console.log('Error: ', error.message)
	}
}
async function createAllTables() {
	try {
		await databaseModule.initialize();
		console.log(`Result: all tables created!`);
	} catch (error) {
		console.log('Error: ', error.message)
	}
}
async function populateDatabase() {
	try {
		await databaseModule.initialize();
		const { User, TaskGroup, Task } = databaseModule.database.model;
		const userIds = [];
		const groupIds = [];
		const numberInsertions = 4;
		let index = 0;

		for (index = 0; index < numberInsertions; index++) {

			const { insertId } = await User.insert(
				{
					name: `user${index}`,
					username: `name${index}`,
					password: `pwd${index}`,
					email: `email${index}`
				}
			);
			userIds.push(insertId);
		}
		index = 0;

		for (const useId of userIds) {
			const { insertId } = await TaskGroup.insert(
				{
					idUser: useId,
					title: `group${index}`,
					description: `group desc ${index}`
				}
			);
			groupIds.push(insertId);
			index++;
		}

		for (const groupId of groupIds) {
			for (index = 0; index < 10; index++) {
				const { insertId } = await Task.insert(
					{
						idGroup: groupId,
						title: `task${index}`,
						description: `task desc ${index}`
					}
				);
			}
		}
		console.log(`Result: Finished populate dabase!`);
	} catch (error) {
		console.log('Error: ', error.message)
	}
}
async function test() {
	try {
		await databaseModule.initialize();
		const database = databaseModule.database;
		const { User } = database.model;
		console.log(await User.deleteByEmail(1));
	} catch (error) {
		console.log('Error: ', error.message)
	}
}
async function executeCommands(args) {
	const commands = {
		'create-db': createDatabase,
		'drop-db': dropDatabase,
		'create-tables': createAllTables,
		'populate-db': populateDatabase,
		'clear-db': async () => {
			await dropDatabase();
			await createDatabase();
			await createAllTables();
			await populateDatabase();
		},
		'test': test,
	};
	await asyncEvery(args, async (command) => {
		const validCommand = commands.hasOwnProperty(command);
		if (validCommand) {
			const callback = commands[command];
			await callback();
		} else {
			console.log(`Error: Invalid command '${command}'!`);
		}
		return validCommand;
	});
	process.exit();
}


const args = process.argv.slice(2);
executeCommands(args);
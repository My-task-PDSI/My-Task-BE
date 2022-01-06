const { database, initialize } = require("../models/database");
initialize();

async function create(req, res) {
	const { task } = req.body
	const { Task } = database.model;
	try {
		const result = await Task.insert(task);

		if (result.affectedRows === 1) {
			console.log("Tarefa criada com sucesso!");
			return res.sendStatus(200);
		}
		return res.sendStatus(500);

	} catch (error) {
		return res.sendStatus(500); // ERRO NO SERVIDOR
	}
}
async function update(req, res) {
	const { task } = req.body
	const { Task } = database.model;
	try {
		const result = await Task.update(task);
		if (result.affectedRows === 1) {
			return res.sendStatus(200);
		}
		return res.sendStatus(404);

	} catch (error) {
		return res.sendStatus(500); // ERRO NO SERVIDOR
	}
}
async function deleteTask(req, res) {
	const { id } = req.params;
	const { Task } = database.model;
	try {
		const result = await Task.deleteById(id);
		if (result.affectedRows === 1) {
			return res.sendStatus(200);
		}
		return res.sendStatus(404);
	} catch (error) {
		return res.sendStatus(500); // ERRO NO SERVIDOR
	}
}
async function findAllTasksFromGroup(req, res) {
	const idGroup = req.params.idGroup;
	const { Task } = database.model;
	try {
		const result = await Task.findAllTasksFromGroup(idGroup);
		return res.send(result);
	} catch (error) {
		return res.sendStatus(500);
	}
}

module.exports = { create, update, findAllTasksFromGroup, deleteTask }
const { database, initialize } = require("../models/database");
initialize();

async function create(req, res) {
	const { idGroup, task } = req.body
	const { Task } = database.model;
	try {
		const result = await Task.findByPk(task.id);
		if (result) {
			return res.sendStatus(403) // TAREFA JÁ EXISTE
		}
		await Task.insert({ idGroup, title: task.title, description: task.description });
		console.log("Tarefa criada com sucesso!");
		return res.sendStatus(200);

	} catch (error) {
		return res.sendStatus(500) // ERRO NO SERVIDOR
	}
}

async function findAllTasksFromGroup(req, res) {
	const idGroup = req.params.idGroup;
	const { Task } = database.model;

	try {
		const result = await Task.findAllTasksFromGroup(idGroup);
		if (result) {
			console.log(result)
			return res.send(result) // ENVIAR TASKS PARA O FRONTEND
		} else {
			return res.sendStatus(404) // NÃO EXISTEM TAREFAS NO GRUPO
		}
	} catch (error) {
		console.log(error.message)
		return res.sendStatus(500)
	}
}

module.exports = { create, findAllTasksFromGroup }
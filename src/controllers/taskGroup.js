const { database, initialize } = require("../models/database");
initialize();

async function create(req, res) {
	const { title, description, idUser } = req.body
	const { TaskGroup } = database.model;
	try {
		const { insertId, affectedRows } = await TaskGroup.insert({ idUser, title, description });
		if (affectedRows > 0) {
			console.log("Grupo inserido com sucesso");
			return res.status(200).send({ id: insertId });
		}
		return res.sendStatus(500);
	} catch (error) {
		return res.sendStatus(500);
	}
}
async function getOne(req, res) {
	const { idGroup } = req.params

	const { TaskGroup } = database.model;

	try {
		const result = await TaskGroup.findById(idGroup);
		if (result) {
			return res.status(200).send(result);
		}
		return res.sendStatus(404);
	} catch (error) {
		return res.sendStatus(500)
	}
}
async function getAll(req, res) {

	const { TaskGroup } = database.model;
	try {
		const result = await TaskGroup.findAll();
		if (result) {
			return res.send(result);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		return res.sendStatus(500); // ERRO INTERNO DO SERVIDOR
	}
}
async function update(req, res) {
	const { idGroup } = req.params;
	const { title, description } = req.body;
	const { TaskGroup } = database.model;
	try {
		const { affectedRows } = await TaskGroup.update({ id: idGroup, title, description });
		if (affectedRows > 0) {
			console.log("Grupo atualizado com sucesso");
			return res.sendStatus(200);
		}
		return res.sendStatus(500);
	} catch (error) {
		return res.sendStatus(500);
	}
}
async function deleteGroup(req, res) {
	const { idGroup } = req.params;
	const { TaskGroup } = database.model;
	try {
		const { affectedRows } = await TaskGroup.deleteById(idGroup);
		if (affectedRows > 0) {
			console.log("Grupo deletado com sucesso");
			return res.sendStatus(200);
		}
		return res.sendStatus(500);
	} catch (error) {
		return res.sendStatus(500);
	}
}

module.exports = { create, getOne, getAll, update, deleteGroup }
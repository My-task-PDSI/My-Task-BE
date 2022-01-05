const { database, initialize } = require("../models/database");
initialize();



async function create(req, res) {
	const { title, description, idUser } = req.body

	const { TaskGroup } = database.model;

	console.log(`newGroup: ${title} | ${description}`);

	try {
		await TaskGroup.insert({ idUser, title, description });
		console.log("Grupo inserido com sucesso");
		return res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(500);
	}
}
async function getOne(req, res) {
	const { idGroup } = req.params

	const { TaskGroup } = database.model;

	console.log("id grupooo: " +idGroup)

	try {
		const result = await TaskGroup.findOne(idGroup)

		console.log("Grupo encontrado: " + result)
		return res.send(result)
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

async function deleteGroup(req, res) {
	const { idGroup, title, description } = req.body

	const { TaskGroup } = database.model;
	console.log(`delGroup: ${title} | ${description}`);

	try {
		await TaskGroup.delete(idGroup);
			console.log("Grupo deletado com sucesso");
			return res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(500);
	}
}

module.exports = { create, getOne, getAll, deleteGroup }

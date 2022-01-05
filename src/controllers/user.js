const { database, initialize } = require("../models/database");
initialize();

async function login(request, response) {
	const username = request.body.username;
	const password = request.body.password;

	console.log(`${username}\n${password}`)

	const { User } = database.model;
	try {
		if (username && password) {
			const result = await User.findWithNameAndPassword(username, password);
			console.log("resultado busca: ", result);

			if (result) {
				return response.sendStatus(200);
			}
			return response.sendStatus(404);

		}
		return response.sendStatus(200)

	} catch (error) {
		return res.sendStatus(500) // ERRO NO SERVIDOR
	}
}

async function signup(req, res) {
	const { name, username, email, password } = req.body
	const { User } = database.model;

	try {
		const result = await User.findUser(name, username, email);
		if (result) {
			console.log("Usuário já existente");
			return res.sendStatus(403)
		} else {
			await User.insert({ name, username, password, email });
			console.log("Usuário inserido com sucesso!");
			return res.sendStatus(200)
		}
	} catch (error) {
		console.log(error);
	}
}
async function deleteUser(req, res) {
	const { email } = req.body
	const { User } = database.model;
	try {
		const user = User.findEmail(email);
		if (user) {
			await User.deleteWithEmail(email);
			return res.status(200).send({ status: "Usuario deletado" });
		} else {
			return res.status(404).send({ error: "Usuario Nao Encontrado" });
		}
	} catch (error) {
		console.log(error);
	}
}
module.exports = { login, signup , deleteUser}
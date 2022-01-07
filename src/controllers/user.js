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

			if (result.length > 0) {
				return response.status(200).send({ status: "Usuário encontrado" })
			}
			return response.status(404).send({ error: "Usuário não encontrado" });

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
		if (result.length > 0) {
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
		const user = await User.findWithEmail(email);
		if (user.length > 0) {
			await User.deleteWithEmail(email);
			return res.status(200).send({ status: "Usuario deletado" });
		} else {
			return res.status(404).send({ error: "Usuario Nao Encontrado" });
		}
	} catch (error) {
		console.log(error);
	}
}

async function alterUser(req, res) {
	const { password, name, email } = req.body
	const userName = req.params.userName
	const { User } = database.model;
	try {

		if (password !== undefined) {
			if (password.trim().length < 5) {
				return res.status(403).send({ error: "Senha invalida" });
			}
		}
		if (name !== undefined) {
			if (name.trim().length < 3) {
				return res.status(403).send({ error: "Nome invalido" });
			}
		}
		if (email !== undefined) {
			const user = await User.findWithEmail(email);
			if (user.length > 0) {
				console.log("Email ja cadastrado");
				return res.status(403).send({ error: "Email ja cadastrado" });
			} else {

				return await updatateUserQuery(req, res);
			}
		} else {
			return await updatateUserQuery(req, res);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function updatateUserQuery(req, res) {
	const { password, name, email } = req.body
	const { User } = database.model;
	const userName = req.params.userName
	try {
		console.log("Deletando usuario");
		const user = await User.findWithEmail(email);
		var newPassword = password !== undefined ? password : user[0].password;
		var newName = name !== undefined ? name : user[0].name;
		var newEmail = email !== undefined ? email : user[0].email;
		await User.updateWithUsername(userName, newName, newPassword, newEmail);
		console.log("Usuario Alterado - ", userName);
		return res.status(200).send({ status: "Alteracoes Realizadas" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: "Erro no update do usuario" });
	}
}
module.exports = { login, signup, deleteUser, alterUser, updatateUserQuery }
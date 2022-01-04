const database = require("../services/database")

const login = async (request, response) => {
    var username = request.body.username;
    var password = request.body.password;

    console.log(`${username}\n${password}`)
    if (username && password) {
        database.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result, fields) {
            if (err) throw err;
            console.log("resultado busca: " + JSON.stringify(result));
            if (result.length == 0) {
                return response.sendStatus(404);
            } else {
                return response.sendStatus(200)
            }
        });

    }
}

const signup = async (req, res) => {
    const { name, username, email, password } = req.body

    try {
        database.query(`SELECT * FROM users WHERE name = '${name}' OR username = '${username}' OR email = '${email}'`, function (err, result, fields) {
            if (err) throw err;
            console.log("resultado busca: " + JSON.stringify(result) + result.length);
            if (result.length == 0) {
                database.query('INSERT INTO users(name,username,password,email) VALUES(?,?,?,?)', [name, username, password, email], function (error, results) {
                    console.log("Usuário inserido com sucesso!");
                    return res.status(200).send({ status: "Usuario cadastrado com sucesso" })
                });
            } else {
                console.log("Usuário já existente");
                return res.status(403).send({ error: "Usuario ja cadastrado" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    const { email } = req.body

    try {
        database.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                database.query(`DELETE FROM users WHERE email = '${email}'`, function (error, rows, fields) {
                    if (error) throw error;
                    return res.status(200).send({ status: "Usuario deletado" });
                });
            } else {
                return res.status(404).send({ error: "Usuario Nao Encontrado" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { login, signup, deleteUser }
const database = require("../services/database")

const login = async (request, response) => {
	var username = request.body.username;
	var password = request.body.password;

	console.log(`${username}\n${password}`)
	if (username && password) {
        database.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result, fields) {
            if (err) throw err;
            console.log("resultado busca: " + JSON.stringify(result) );
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
                database.query('INSERT INTO users(name,username,password,email) VALUES(?,?,?,?)', [name, username, password, email], function(error, results) {
                    console.log("Usuário inserido com sucesso!");
                    return res.sendStatus(200)
                });
            } else {
                console.log("Usuário já existente");
                return res.sendStatus(403)
            }
          });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { login, signup}
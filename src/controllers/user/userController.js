const database = require("../../services/database")

const login = async (request, response) => {
	var username = request.body.email;
	var password = request.body.password;

	console.log(`${username}\n${password}`)
	if (username && password) {
        database.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result, fields) {
            if (err) throw err;
            console.log("resultado busca: " + JSON.stringify(result) );
          });

        // if (results._results.length == 0) {
        //     return response.sendStatus(404);
        // } else {
        //     return response.send("ok")
        // }
    }


	// 	connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
	// 		if (results.length > 0) {
	// 			request.session.loggedin = true;
	// 			request.session.email = email;
	// 			response.redirect('/home');
	// 		} else {
	// 			response.send('Incorrect Username and/or Password!');
	// 		}			
	// 		response.end();
	// 	});
	// } else {
	// 	response.send('Please enter Username and Password!');
	// 	response.end();
	// }
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
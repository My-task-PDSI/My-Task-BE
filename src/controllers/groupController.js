const database = require("../services/database")

const create = async (req, res) => {
    const { title, description } = req.body

    console.log(`newGroup: ${title} | ${description}`);

    try {
        database.query('INSERT INTO task_group(idUser,title,description,creationDate) VALUES(?,?,?,?)', [null, req.body.title, req.body.description, null], function (err) {
            if(err) throw err
            console.log("Grupo inserido com sucesso")
            return res.sendStatus(200)
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}
const readAll = async (req, res) => {
    try {
        database.query(`SELECT * FROM task_group`, function (err, result) {
            if (err) throw err
            let groups = result

            if(groups.length == 0) {
                return res.sendStatus(404)
            } else {
                return res.send(groups)
            }
            
        })
    } catch (error) {
        return res.sendStatus(500) // ERRO INTERNO DO SERVIDOR
    }
}


module.exports = { create, readAll }
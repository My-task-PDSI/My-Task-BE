const database = require("../services/database")

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


module.exports = { readAll }
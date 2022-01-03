const database = require("../services/database")


const create = async (req, res) => {
    const { idGroup, task } = req.body

    try {
        database.query(`SELECT * FROM tasks WHERE idTask = ${task.id}`, function (err, result) {
            if(err) throw err
            if (result.length == 0 ) {
                database.query(`INSERT INTO tasks(idGroup, title, description, creationDate) VALUES (${idGroup, task.title, task.description, task.creationDate})`, function (err, result) {
                    if (err) throw err
                    console.log("Tarefa criada com sucesso!");
                    return res.sendStatus(200)
                })
                return res.sendStatus(403) // TAREFA JÁ EXISTE
            }
        })
    } catch (error) {
        return res.sendStatus(500) // ERRO NO SERVIDOR
    }
}

const readAll = async (req, res) => {
    const idGroup = req.params.idGroup

    console.log(idGroup);
    try {
        database.query(`SELECT * FROM tasks WHERE idGroup = ${idGroup}`, function (err, result) {
            if(err) throw err
            if (result.length == 0) {
                return res.send(404) // NÃO EXISTEM TAREFAS NO GRUPO
            } else {
                return res.send(result) // ENVIAR TASKS PARA O FRONTEND
            }
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = { create, readAll }
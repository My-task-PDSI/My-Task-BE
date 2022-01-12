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

  const { Task, TaskGroup , UserAndGroupRelationship: UserGroup} = database.model;

  try {
    const response = {};
    const [group] = await TaskGroup.findById(idGroup);
    if (!group) {
      return res.sendStatus(404);
    }
    response.group = group;
    response.tasks = await Task.findAllByIdGroup(idGroup);
    response.members = await UserGroup.findAlMembersGroup(idGroup);

    return res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500)
  }
}
async function getAll(req, res) {

  const { TaskGroup } = database.model;
  try {
    const result = await TaskGroup.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(500); // ERRO INTERNO DO SERVIDOR
  }
}
async function getGroupsOfUser(req, res) {
  const { idUser } = req.params;
  const { TaskGroup } = database.model;
  try {
    const result = await TaskGroup.findByIdUser(idUser);
    return res.send(result);
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

module.exports = { create, getOne, getAll, update, deleteGroup , getGroupsOfUser}

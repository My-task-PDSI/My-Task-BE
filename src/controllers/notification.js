const { database, initialize } = require("../models/database");
initialize();

async function getAllOfUser(req, res) {
  const idUser = req.params.idUser;
  const { Notification } = database.model;
  try {
    const result = await Notification.getAllByIdUser(idUser);
    return res.send(result);
  } catch (error) {
    return res.sendStatus(500);
  }
}
async function userHasNotification(req, res) {
  const idUser = req.params.idUser;
  const { Notification } = database.model;
  try {
    const result = await Notification.userHasNotification(idUser);
    return res.send({ exists: (!!result) });
  } catch (error) {
    return res.sendStatus(500);
  }
}
module.exports = { getAllOfUser, userHasNotification }
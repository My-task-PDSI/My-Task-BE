const { database, initialize } = require("../models/database");

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
async function start(ms = 1000) {
	await initialize();
	const { Task, Notification } = database.model;
	console.log('iniciando sistema de notificaoes...')
	while (true) {
		const expiredTasks = await Task.getAllExpiredWithIdUser();
		const allNotifications = await Notification.getAll();
		const addTaskArray = expiredTasks.filter((task) => {
			return allNotifications.every(notification => notification.idTask != task.id);
		});
		for (const task of addTaskArray) {
			const newNotification = {
				idTask: task.id,
				idUser: task.idUser,
				message: `task "${task.title}" is expired!`
			};
			await Notification.insert(newNotification);
			console.log('nova notificacao criada',newNotification);
			await Task.setExpiredById(task.id);
		}
		//const notificationsNotSeen = Notification.allNotSeen();
		await sleep(ms);
	}
};
module.exports = { start }
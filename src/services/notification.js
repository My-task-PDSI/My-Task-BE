const { database, initialize } = require("../models/database");

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
async function start(socketArray, ms = 1000) {
	await initialize();
	const { Task, Notification, TaskGroup } = database.model;
	console.log('iniciando sistema de notificaoes...')
	while (true) {
		try {

			const expiredTasks = await Task.getAllExpiredWithIdUser();
			const allNotifications = await Notification.getAll();
			const addTaskArray = expiredTasks.filter((task) => {
				return allNotifications.every(notification => notification.idTask != task.id);
			});
			for (const task of addTaskArray) {
				const group = await TaskGroup.findById(task.idGroup)
				const newNotification = {
					idTask: task.id,
					idUser: task.idUser,
					groupTitle: group[0].title,
					message: `tarefa "${task.title}" atingiu seu prazo!`
				};
				await Notification.insert(newNotification);
				console.log('nova notificacao criada', newNotification);
				await Task.setExpiredById(task.id);
			}
			const notificationsNotSeen = await Notification.allNotSeen();
			notificationsNotSeen.forEach(notification => {
				const idUser = notification.idUser;
				if (socketArray.hasOwnProperty(idUser)) {
					const socket = socketArray[idUser];
					socket.emit('notification', notification);
				}
			});
		} catch (error) {
			console.error("erro nas notificações: " + error)
		}
		await sleep(ms);
	}
};
module.exports = { start }
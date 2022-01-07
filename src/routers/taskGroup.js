const express = require('express');
const router = express.Router();
const taskGroupController = require('../controllers/taskGroup');
const taskController = require('../controllers/task');

router.post('/', taskGroupController.create);
router.get('/all', taskGroupController.getAll);
router.get('/:idGroup', taskGroupController.getOne);
router.put('/:idGroup', taskGroupController.update);
router.delete('/:idGroup', taskGroupController.deleteGroup);
router.get('/tasks/:idGroup', taskController.findAllTasksFromGroup);
router.get('/user/:idUser', taskGroupController.getGroupsOfUser);

module.exports = router;
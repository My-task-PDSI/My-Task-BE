const express = require('express');
const router = express.Router();
const taskGroupController = require('../controllers/taskGroup');
const taskController = require('../controllers/task');

router.post('/', taskGroupController.create);
router.delete('/', taskGroupController.deleteGroup);

router.get('/all', taskGroupController.getAll);
router.get('/tasks/:idGroup', taskController.findAllTasksFromGroup);

module.exports = router;
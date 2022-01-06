const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router.post('/', taskController.create);
router.put('/', taskController.update);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
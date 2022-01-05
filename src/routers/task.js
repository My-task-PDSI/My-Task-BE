const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router.post('/', taskController.create);

module.exports = router;
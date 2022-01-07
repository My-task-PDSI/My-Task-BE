const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.delete('/signup', userController.deleteUser)
router.put('/signup/:userName', userController.alterUser)

module.exports = router;
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.get('/user/:idUser', notificationController.getAllOfUser);

module.exports = router;
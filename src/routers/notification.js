const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.get('/user/:idUser', notificationController.getAllOfUser);
router.get('/user/:idUser/has-notification', notificationController.userHasNotification);

module.exports = router;
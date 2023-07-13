const router = require('express').Router();
const NotificationController = require('../controllers/notification.controller');

router.get('/', NotificationController.findAllByUserId);

module.exports = router;

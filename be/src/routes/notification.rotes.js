const router = require('express').Router();
const NotificationController = require('../controllers/notification.controller');

router.get('/:id', NotificationController.findAllByUserId);

module.exports = router;

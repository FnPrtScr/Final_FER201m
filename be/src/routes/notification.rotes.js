const router = require('express').Router();
const NotificationController = require('../controllers/notification.controller');

router.get('/:id', NotificationController.findAllByUserId);
router.post('/u/', NotificationController.updateBulkNoti);

module.exports = router;

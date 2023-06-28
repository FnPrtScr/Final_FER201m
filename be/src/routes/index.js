const router = require('express').Router();


// router.use('/user', require('./users.route'));
router.use('/role', require('./role.routes'));
// router.use('/categories', require('./categories.routes'));
// router.use('/reminders', require('./reminders.routes'));
// router.use('/reminders_categories', require('./reminders_categories.routes'));


module.exports = router;


const router = require('express').Router();
const UserController = require('../controllers/users.controller');

router.get('/', UserController.findUser);

module.exports = router;

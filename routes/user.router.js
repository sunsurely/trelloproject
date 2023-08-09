const express = require('express');
const UserController = require('../controllers/user.controller');

const { isLoggedIn } = require('../middleware/userState.middleware');

const userController = new UserController();

const router = express.Router();

router.post('/signup', isLoggedIn, userController.createUser);

module.exports = router;

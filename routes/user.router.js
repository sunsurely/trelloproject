const express = require('express');
const UserController = require('../controllers/user.controller');
const { authorizated } = require('../middleware/userState.middleware');
const { isLoggedIn } = require('../middleware/userState.middleware');

const userController = new UserController();

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/me/:userId', authorizated, userController.getUser);
router.put('/me/:userId', authorizated, userController.modifyUser);
module.exports = router;

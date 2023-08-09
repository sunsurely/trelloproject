const express = require('express');
const UserController = require('../controllers/user.controller');
const { authorizated } = require('../middleware/userState.middleware');
const { isLoggedIn } = require('../middleware/userState.middleware');

const userController = new UserController();

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/me/', authorizated, userController.getUser);
router.put('/me/', authorizated, userController.modifyUser);
router.delete('/me/', authorizated, userController.deleteUser);
module.exports = router;

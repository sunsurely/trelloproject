const express = require('express');
const UserController = require('../controllers/user.controller');
const { authorizated } = require('../middleware/userState.middleware');
const { isLoggedIn } = require('../middleware/userState.middleware');
const BoardController = require('../controllers/board.controller');

const userController = new UserController();
const boardController = new BoardController();

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/me/', authorizated, userController.getUser);
router.put('/me/', authorizated, userController.modifyUser);
router.delete('/me/', authorizated, userController.deleteUser);
router.post('/', boardController.createBoard);
module.exports = router;

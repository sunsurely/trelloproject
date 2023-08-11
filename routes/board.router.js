const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board.controller');
const { isLoggedIn } = require('../middlewares/userState.middleware'); // s 붙일지 말지 정하기

const boardController = new BoardController();

router.post('/', isLoggedIn, boardController.createBoard);
router.get('/', isLoggedIn, boardController.getBoardList);
router.get('/:boardId', isLoggedIn, boardController.getBoard); // 로그인 확인 후 접근
router.put('/:boardId', isLoggedIn, boardController.modifyBoard);
router.delete('/:boardId', isLoggedIn, boardController.deleteBoard);

module.exports = router;

const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board.controller');

const boardController = new BoardController();

router.post('/', boardController.createBoard);
router.get('/', boardController.getBoardList);
router.get('/:boardId', boardController.getBoard);
router.put('/:boardId', boardController.updateBoard);
router.delete('/:boardId', boardController.deleteBoard);

module.exports = router;
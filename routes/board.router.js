const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board.controller');
const {
  isLoggedIn,
  authorizated,
} = require('../middleware/userState.middleware'); // s 붙일지 말지 정하기

const boardController = new BoardController();

router.post('/', authorizated, boardController.createBoard);
router.get('/', authorizated, boardController.getBoardList);
router.get('/:boardId', authorizated, boardController.getBoard); // 로그인 확인 후 접근
router.put('/:boardId', authorizated, boardController.modifyBoard);
router.delete('/:boardId', authorizated, boardController.deleteBoard);
router.post(
  '/:boardId/invitation',
  authorizated,
  boardController.inviteBoardGroupMember,
);
router.get(
  '/:boardId/invitation',
  authorizated,
  boardController.getBoardGroupList,
);
router.patch(
  '/:boardId/invitation',
  authorizated,
  boardController.modifyBoardGroupMemberPermission,
);
router.delete(
  '/:boardId/invitation',
  authorizated,
  boardController.getBoardGroupList,
);

module.exports = router;

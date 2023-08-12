const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board.controller');
const {
  authorizated,
  hasMinimumPermission,
} = require('../middleware/userState.middleware');

const boardController = new BoardController();
// 보드 생성
router.post('/', authorizated, boardController.createBoard);
// 보드 목록 조회
router.get('/', authorizated, boardController.getBoardList);
// 보드 조회
router.get('/:boardId', authorizated, boardController.getBoard);
// 보드 내용 수정
router.put(
  '/:boardId',
  authorizated,
  hasMinimumPermission('write'),
  boardController.modifyBoard,
);
// 보드 삭제
router.delete(
  '/:boardId',
  authorizated,
  hasMinimumPermission('owner'),
  boardController.deleteBoard,
);
// 보드에 초대
router.post(
  '/:boardId/invitation',
  authorizated,
  hasMinimumPermission('write'),
  boardController.inviteBoardGroupMember,
);
// 보드 멤버 조회
router.get(
  '/:boardId/invitation',
  authorizated,
  hasMinimumPermission('write'),
  boardController.getBoardGroupList,
);
// 보드 멤버 권한 수정
router.patch(
  '/:boardId/invitation',
  authorizated,
  hasMinimumPermission('owner'),
  boardController.modifyBoardGroupMemberPermission,
);
// 보드 멤버 강퇴(삭제)
router.delete(
  '/:boardId/invitation',
  authorizated,
  hasMinimumPermission('owner'),
  boardController.deleteBoardGroupMember,
);

module.exports = router;

const MakeError = require('../utils/makeErrorUtil');
const BoardRespotisoty = require('../repositories/board.repository');
const BoardGroupRepository = require('../repositories/boardGroup.repository');
const UserService = require('../services/user.service');
const CollaboratorCaching = require('../cache');

const { Transaction } = require('sequelize');
const { sequelize } = require('../models');

class BoardService {
  boardRepo = new BoardRespotisoty();
  boardGroupRepo = new BoardGroupRepository();
  userService = new UserService();
  collaboratorCaching = new CollaboratorCaching();
  // 보드 생성
  createBoard = async (userId, name, color, description) => {
    if (isNaN(userId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }
    if (!name) {
      throw new MakeError(412, '이름이 입력되지 않았습니다.');
    }
    if (!color) {
      throw new MakeError(412, '컬러 값이 입력되지 않았습니다.');
    }
    if (!description) {
      throw new MakeError(412, '설명이 입력되지 않았습니다.');
    }

    // 보드를 생성할 때 멤버 테이블에 보드 생성자의 정보를 넣기 때문에 트랜잭션을 사용함
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const resultForcreateBoard = await this.boardRepo.createBoard(
        userId,
        name,
        color,
        description,
        t,
      );

      const boardId = resultForcreateBoard.boardId;
      const resultInviteMember =
        await this.boardGroupRepo.inviteBoardGroupMember(
          boardId,
          userId,
          'owner',
          t,
        );
      // 트랜잭션 수행에 실패 시 rollback 시키기 위한 장치
      if (!resultForcreateBoard || !resultInviteMember) {
        throw new MakeError(402, 'position 수정에 실패했습니다.');
      }

      await t.commit();

      return resultForcreateBoard;
    } catch (err) {
      console.error('Board creation error', err);
      await t.rollback();
      throw err;
    }
  };

  // 보드 목록 조회
  getBoardList = async (userId) => {
    if (isNaN(userId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardRepo.getBoardList(userId);

    if (!result) {
      throw new MakeError(500, 'Interval Server Error');
    }
    if (result.length <= 0) {
      throw new MakeError(201, '보드 목록이 비어있습니다.');
    }

    return result;
  };

  // 보드 조회(접속?)
  getBoard = async (boardId, userId) => {
    if (isNaN(userId) || isNaN(boardId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const existInvitedData =
      await this.collaboratorCaching.getCachedCollaborator(boardId);

    if (!existInvitedData || existInvitedData.length <= 0) {
      await this.collaboratorCaching.initCachedCollaborators(boardId);
    }

    const result = await this.boardRepo.getBoard(boardId);
    if (!result) {
      throw new MakeError(404, '보드가 존재하지 않습니다.');
    }

    return result;
  };

  // 보드 수정
  modifyBoard = async (userId, boardId, name, color, description) => {
    if (isNaN(userId) || isNaN(boardId) || !name || !color || !description) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const existBoard = await this.boardRepo.getBoard(boardId);

    if (!existBoard) {
      throw new MakeError(404, '존재하지 않는 보드입니다.');
    }

    const result = await this.boardRepo.modifyBoard(
      boardId,
      name,
      color,
      description,
    );

    if (!result) {
      throw new MakeError(400, '업데이트 실패하였습니다.');
    }

    return result;
  };

  // 보드 삭제
  deleteBoard = async (boardId, userId) => {
    if ((isNaN(boardId), isNaN(userId))) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }
    const existBoard = await this.boardRepo.getBoard(boardId);
    if (!existBoard) {
      throw new MakeError(404, '존재하지 않는 보드입니다.');
    }

    if (existBoard.ownerId !== userId) {
      throw new MakeError(403, '보드를 삭제할 권한이 없습니다.');
    }

    const result = await this.boardRepo.deleteBoard(boardId);

    if (!result) {
      throw new MakeError(400, '삭제에 실패하였습니다.');
    }

    return result;
  };

  // 보드에 멤버 초대
  inviteBoardGroupMember = async (boardId, email, permission = 'readonly') => {
    if (isNaN(boardId) || !email) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const existUser = await this.userService.getUser(email);
    if (!existUser) {
      throw new MakeError(404, '존재하지 않는 유저입니다.');
    }
    const result = await this.boardGroupRepo.inviteBoardGroupMember(
      boardId,
      existUser.userId,
      permission,
    );

    await this.collaboratorCaching.initCachedCollaborators(boardId);
    if (!result) {
      throw new MakeError(400, '멤버 초대에 실패하였습니다.');
    }

    return result;
  };

  // 보드 멤버 리스트 보여주기
  getBoardGroupList = async (boardId) => {
    if (isNaN(boardId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.getBoardGroupList(boardId);
    if (result.length <= 0) {
      throw new MakeError(200, '멤버가 존재하지 않습니다.');
    }

    return result;
  };

  // 보드 멤버 권한 수정
  modifyBoardGroupMemberPermission = async (boardId, userId, permission) => {
    if (isNaN(boardId) || isNaN(userId) || !permission) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.modifyBoardGroupMemberPermission(
      boardId,
      userId,
      permission,
    );

    await this.collaboratorCaching.initCachedCollaborators(boardId);
    if (!result) {
      throw new MakeError(400, '수정이 실패하였습니다.');
    }

    return result;
  };

  // 보드 멤버 삭제
  deleteBoardGroupMember = async (boardId, userId) => {
    if (isNaN(boardId) || isNaN(userId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.deleteBoardGroupMember(
      boardId,
      userId,
    );

    await this.collaboratorCaching.deleteCachedCollaborator(boardId);

    if (!result) {
      throw new MakeError(400, '삭제에 실패하였습니다.');
    }

    return result;
  };
}

module.exports = BoardService;

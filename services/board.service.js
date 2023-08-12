const MakeError = require('../utils/makeErrorUtil');
const BoardRespotisoty = require('../repositories/board.repository');
const BoardGroupRepository = require('../repositories/boardGroup.repository');
const CollaboratorCaching = require('../cache');
const collaboratorCaching = new CollaboratorCaching();
const UserService = require('../services/user.service');
const { Transaction } = require('sequelize');
const { sequelize } = require('../models');

class BoardService {
  boardRepo = new BoardRespotisoty();
  boardGroupRepo = new BoardGroupRepository();
  userService = new UserService();

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
      console.log('🚗🚗🚗🚗🚗🚗🚗🚗');
      // console.log(resultForcreateBoard);
      //   const board = await this.boardRepo.getBoard(userId, t);
      console.log(resultForcreateBoard.boardId);
      const boardId = resultForcreateBoard.boardId;
      const resultInviteMember =
        await this.boardGroupRepo.inviteBoardGroupMember(
          boardId,
          userId,
          'owner',
          t,
        );

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

    // const result = await this.boardRepo.createBoard(
    //   userId,
    //   name,
    //   color,
    //   description,
    // );

    // if (!result) {
    //   throw new MakeError(400, '보드 생성에 실패하였습니다.');
    // }

    return result;
  };

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

  getBoard = async (boardId, userId) => {
    collaboratorCaching.setCachedCollaborators(boardId);
    if (isNaN(userId) || isNaN(boardId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }
    const result = await this.boardRepo.getBoard(boardId);
    if (!result) {
      throw new MakeError(404, '보드가 존재하지 않습니다.');
    }

    return result;
  };

  // 보드를 수정할 때는 cache를 사용하는게 어떨까?
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

    if (!result) {
      throw new MakeError(400, '멤버 초대에 실패하였습니다.');
    }

    return result;
  };

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

  modifyBoardGroupMemberPermission = async (boardId, userId, permission) => {
    if (isNaN(boardId) || isNaN(userId) || permission) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.modifyBoardGroupMemberPermission(
      boardId,
      userId,
      permission,
    );

    if (!result) {
      throw new MakeError(400, '수정이 실패하였습니다.');
    }

    return result;
  };

  deleteBoardGroupMember = async (boardId, userId) => {
    if (isNaN(boardId) || isNaN(userId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.deleteBoardGroupMember(
      boardId,
      userId,
    );
    if (!result) {
      throw new MakeError(400, '삭제에 실패하였습니다.');
    }

    return result;
  };
}

module.exports = BoardService;

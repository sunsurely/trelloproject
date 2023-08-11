const MakeError = require('../utils/makeErrorUtil');
const BoardRespotisoty = require('../repositories/board.repository');
const BoardGroupRepository = require('../repositories/boardGroup.repository');
const jwt = require('jsonwebtoken');

class BoardService {
  boardRepo = new BoardRespotisoty();
  boardGroupRepo = new BoardGroupRepository();

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

    const result = await this.boardRepo.createBoard(
      userId,
      name,
      color,
      description,
    );

    if (!result) {
      throw new MakeError(400, '보드 생성에 실패하였습니다.');
    }

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
  modifyBoard = async (
    userId,
    // boardToken,
    boardId,
    name,
    color,
    description,
  ) => {
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

  //   deleteBoard = async (boardId, userId, boardToken) => {
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

  inviteBoardGroupMember = async (boardId, userId, permission = 'readonly') => {
    if (isNaN(boardId) || isNaN(userId)) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const result = await this.boardGroupRepo.inviteBoardGroupMember(
      boardId,
      userId,
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

  modifyBoardGroupMemberPermission = async (boardId, memberId, permission) => {
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
    // const result = await this.boardGroupRepo.deleteBoardGroupMember(
    //   boardId,
    //   userId,
    // );
  };
}

module.exports = BoardService;

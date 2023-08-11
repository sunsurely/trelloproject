const MakeError = require('../utils/makeErrorUtil');
const BoardRespotisoty = require('../repositories/board.repository');
const BoardGroupRepository = require('../repositories/boardGroup.repository');
const jwt = require('jsonwebtoken');

class BoardService {
  boardRepo = new BoardRespotisoty();
  boardGroupRepo = new BoardGroupRepository();

  createBoard = async (userId, name, color, description) => {
    const result = await this.boardRepo.createBoard(
      userId,
      name,
      color,
      description,
    );
    if (!name) {
      throw new MakeError(412, '이름이 입력되지 않았습니다.');
    }
    if (!color) {
      throw new MakeError(412, '컬러 값이 입력되지 않았습니다.');
    }
    if (!description) {
      throw new MakeError(412, '설명이 입력되지 않았습니다.');
    }

    if (!result) {
      throw new MakeError(400, '보드 생성에 실패하였습니다.');
    }

    return result;
  };

  getBoardList = async (userId) => {
    const result = await this.boardRepo.getBoardList(userId);

    if (!result) {
      throw new MakeError(500, 'Interval Server Error');
    }

    return result;
  };

  getBoard = async (boardId, userId) => {
    const result = await this.boardRepo.getBoard(boardId);
    if (!result) {
      throw new MakeError(404, '보드가 존재하지 않습니다.');
    }

    // let permission;

    // 보드 생성한 사람은 owner 권한을 기본적으로 주고 그렇지 않다면 보드 멤버인지 조회
    // if (result.ownerId === userId) {
    //   permission = 'owner';
    // } else {
    //   const result = await this.boardGroupRepo.getBoardGroupMember(
    //     boardId,
    //     userId,
    //   );
    //   // 보드 멤버가 아닐 경우 기본적으로 권한을 읽기 전용으로 두고 그 사람을 보드 멤버로 추가
    //   if (!result) {
    //     permission = 'readonly';
    //     await this.boardGroupRepo.inviteBoardGroupMember(
    //       boardId,
    //       userId,
    //       permission,
    //     );
    //   } else {
    //     // 기존 보드 멤버일 경우 기존에 사용하던 권한을 그대로 사용
    //     permission = result.permission;
    //   }
    // }
    // 보드id와 그에 대한 권한을 담은 토큰 발행
    // const token = jwt.sign(
    //   { tokenBoardId: boardId, permission },
    //   process.env.COOKIE_SECRET,
    // );
    // console.log('getboard: ', permission);

    // return { boardContents: result, token };
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
    const existBoard = await this.boardRepo.getBoard(boardId);

    if (!existBoard) {
      throw new MakeError(404, '존재하지 않는 보드입니다.');
    }
    // 토큰 검사해서 사용자가 접근한 boardId와 권한 정보 확인
    // const { tokenBoardId, permission } = jwt.verify(
    //   boardToken,
    //   process.env.COOKIE_SECRET,
    // );

    // console.log(`boardId: ${boardId}, tokenBoardId: ${tokenBoardId}, permission: ${permission}`);
    // 현재 보드 아이디와 페이지 접속해서 받은 토큰의 보드 아이디가 다를 경우 비정상적인 접근으로 생각
    // if (tokenBoardId !== boardId) {
    //   throw new MakeError(403, '명령 수행 권한이 없습니다.');
    // }

    // // 보드 만든이가 아니면 보드 수정에 권한을 둠
    // if (existBoard.ownerId !== userId) {
    //   if (permission === 'readonly') {
    //     throw new MakeError(403, '수정 권한이 없습니다.');
    //   }
    // }

    const result = await this.boardRepo.modifyBoard(
      boardId,
      name,
      color,
      description,
    );

    if (!result) {
      throw new MakeError(400, '업데이트가 실패하였습니다.');
    }

    return result;
  };

  deleteBoard = async (boardId, userId, boardToken) => {
    // // 토큰 정보에서 보드 아이디와 권한 확인
    // const { tokenBoardId, permission } = jwt.verify(
    //   boardToken,
    //   process.env.COOKIE_SECRET,
    // );

    // console.log(permission);
    // // 보드 아이디가 다르면 삭제 못하게 함
    // if (tokenBoardId !== boardId) {
    //   throw new MakeError(403, '명령 수행 권한이 없습니다.');
    // }
    // // 보드 만든이가 아니면 삭제 못하게 함
    // if (permission !== 'owner') {
    //   throw new MakeError(403, '삭제 권한이 없습니다.');
    // }
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

  //   createBoardGroupMember = async (boardId, userId, permission = "readonly") => {
  //     const result = await this.boardGroupRepo.createBoardGroupMember(boardId, userId, permission)

  //   }
  inviteBoardGroupMember = async (boardId, userId, permission = 'readonly') => {
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
    const result = await this.boardGroupRepo.getBoardGroupList(boardId);

    if (result.length <= 0) {
      throw new MakeError(200, '멤버가 존재하지 않습니다.');
    }

    return result;
  };

  //   getBoardGroupMember = async (boardId, userId) => {
  //     const result = await this.boardGroupRepo.getBoardGroupMember(
  //       boardId,
  //       userId,
  //     );

  //   };

  modifyPermission = async (boardId, userId) => {
    // const result = await this.boardGroupRepo.modifyPermission(boardId, userId);
  };

  deleteBoardGroupMember = async (boardId, userId) => {
    // const result = await this.boardGroupRepo.deleteBoardGroupMember(
    //   boardId,
    //   userId,
    // );
  };
}

module.exports = BoardService;

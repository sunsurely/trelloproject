const MakeError = require('../utils/makeErrorUtil');
const BoardService = require('../services/board.service');

class BoardController {
  boardService = new BoardService();

  // 보드 등록(생성)
  createBoard = async (req, res, next) => {
    // userId는 임시로 body로 받아옴
    // const { userId, name, color, description } = req.body;
    const { name, color, description } = req.body;
    const userId = res.locals.userId;
    // console.log(userId);

    try {
      const result = await this.boardService.createBoard(
        userId,
        name,
        color,
        description,
      );

      if (result) {
        return res.status(201).json({ message: '등록되었습니다.' });
      } else {
        throw new MakeError(400, '문제가 발생하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  getBoardList = async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      const result = await this.boardService.getBoardList(userId);
      if (result.length >= 0) {
        return res
          .status(201)
          .json({ data: result, message: '보드 목록 불러오기 성공' });
      } else {
        throw new MakeError(
          400,
          '보드들을 불러오는 도중 문제가 발생하였습니다.',
        );
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  getBoard = async (req, res, next) => {
    const { boardId } = req.params;
    const userId = res.locals.userId;
    console.log('🛹🛺🦼🚝🚄🚗🚗🚡🚡🏍🏍🛵🛵');
    console.log(userId);
    try {
      const result = await this.boardService.getBoard(boardId, userId);
      if (result.boardContents) {
        return res.cookie('boardToken', result.token).status(201).json({
          data: result.boardContents,
          message: '보드 불러오기 성공',
        });
      } else {
        throw new MakeError(400, '보드를 불러오는 도중 문제가 발생하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  modifyBoard = async (req, res, next) => {
    const { name, color, description } = req.body;
    const { boardId } = req.params;
    const { boardToken } = req.cookies;
    const userId = res.locals.userId;

    try {
      //   const existBoard = await this.boardService.getBoard(boardId);
      //   console.log(existBoard);

      //   if (!existBoard) {
      //     throw new MakeError(404, '존재하지 않는 보드입니다.');
      //   }
      //   console.log("🚗🚗🚗🚗🚗🚗🚗🚗");

      //   if (existBoard.boardContents.ownerId !== userId) {
      //     throw new MakeError(403, '명령 수행 권한이 없습니다.');
      //   }
      const result = await this.boardService.modifyBoard(
        userId,
        boardToken,
        boardId,
        name,
        color,
        description,
      );
      if (result) {
        return res.status(201).json({
          data: { name, color, description },
          message: '수정이 완료됐습니다.',
        });
      } else {
        throw new MakeError(400, '수정을 실패하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  deleteBoard = async (req, res, next) => {
    const { boardId } = req.params;
    const userId = res.locals.userId;
    const { boardToken } = req.cookies;
    try {
      const result = await this.boardService.deleteBoard(
        boardId,
        userId,
        boardToken,
      );
      if (result) {
        return res.status(201).json({ message: '성공적으로 삭제됐습니다.' });
      } else {
        throw new MakeError(400, '삭제에 실패하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  inviteBoardGroupMember = async (req, res, next) => {
    // email로 초대했을 경우를 상정. email로 초대할 경우 권한 설정 가능
    // 현재 지정할 수 있는 권한은 readonly와 write
    const { email, permission } = req.body;
    const { boardId } = req.params;

    try {
      const result = await this.boardService.inviteBoardGroupMember(
        boardId,
        email,
        permission,
      );

      if (result) {
        return res.status(201).json({ mesage: '보드 초대 요청을 보냈습니다.' }); // 원래라면 이메일 같은 곳에 초대장같은게 보내져야 함
      } else {
        throw new MakeError(400, '초대에 실패하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  getBoardGroupList = async (req, res, next) => {
    const { boardId } = req.params;

    try {
      const result = await this.boardService.getBoardGroupList(boardId);

      if (result) {
        return res.status(201).json({
          data: result,
          message: '보드 멤버 리스트 출력이 성공적으로 됐습니다.',
        });
      } else {
        throw new MakeError(400, '멤버 리스트 출력에 실패하였습니다.');
      }
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  modifyBoardGroupMemberPermission = async (req, res, next) => {
    const { boardId } = req.params;
    const { memberId: userId, permission } = req.body;
  };
}

module.exports = BoardController;

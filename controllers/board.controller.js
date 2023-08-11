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

      return res.status(201).json({ message: '등록되었습니다.' });
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

      return res
        .status(201)
        .json({ data: result, message: '보드 목록 불러오기 성공' });
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

    try {
      const result = await this.boardService.getBoard(boardId, userId);

      return res
        .status(201)
        .json({ data: result, message: '보드 불러오기 성공' });
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
    const userId = res.locals.userId;

    try {
      const result = await this.boardService.modifyBoard(
        userId,
        boardId,
        name,
        color,
        description,
      );
      return res.status(201).json({
        data: { name, color, description },
        message: '수정이 완료됐습니다.',
      });
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
    try {
      const result = await this.boardService.deleteBoard(boardId, userId);
      return res.status(201).json({ message: '성공적으로 삭제됐습니다.' });
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
    const { email, permission } = req.body;
    const { boardId } = req.params;

    try {
      const result = await this.boardService.inviteBoardGroupMember(
        boardId,
        email,
        permission,
      );

      return res.status(201).json({ mesage: '보드 초대 요청을 보냈습니다.' }); // 원래라면 이메일 같은 곳에 초대장같은게 보내져야 함
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

      return res.status(201).json({
        data: result,
        message: '보드 멤버 리스트 출력이 성공적으로 됐습니다.',
      });
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
    const { userId, permission } = req.body;

    try {
      const result = await this.boardService.modifyBoardGroupMemberPermission(
        boardId,
        userId,
        permission,
      );

      return res.status(201).json({
        data: { memberId: userId, permission },
        message: '멤버의 권한이 수정됐습니다.',
      });
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

  deleteBoardGroupMember = async (req, res, next) => {
    const { boardId } = req.params;
    const { userId } = req.body;

    try {
      const result =
        await this.boardService.boardGroupRepo.deleteBoardGroupMember(
          boardId,
          userId,
        );

      return res.status(201).json({ message: '정상적으로 삭제됐습니다.' });
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
}

module.exports = BoardController;

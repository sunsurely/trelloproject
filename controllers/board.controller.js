const MakeError = require('../utils/makeErrorUtil');
const BoardService = require('../services/board.service');

class BoardController {
  boardService = new BoardService();

  // 보드 등록(생성)
  createBoard = async (req, res, next) => {
    // userId는 임시로 body로 받아옴

    // const { userId, name, color, description } = req.body.data;
    const { name, color, description } = req.body.data;
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 목록 조회
  getBoardList = async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      const result = await this.boardService.getBoardList(userId);

      return res
        .status(201)
        .json({ data: result, message: '보드 목록 불러오기 성공' });
    } catch (err) {
      console.error(`Error in file: ${__filename}, getBoardList()`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 조회
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 수정
  modifyBoard = async (req, res, next) => {
    const { name, color, description } = req.body.data;
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 삭제
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 멤버 초대
  inviteBoardGroupMember = async (req, res, next) => {
    const { email, permission } = req.body.data;
    const { boardId } = req.params;

    try {
      // 해당 보드에 body로 부터 받은 이메일(email)과 권한(permission) 정보를 기반으로 보드 멤버를 만들 수 있음
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 멤버 조회
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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 멤버 권한 수정
  modifyBoardGroupMemberPermission = async (req, res, next) => {
    const { boardId } = req.params;
    const { userId, permission } = req.body.data;

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
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 보드 멤버 삭제
  deleteBoardGroupMember = async (req, res, next) => {
    const { boardId } = req.params;
    const { userId } = req.body.data;

    try {
      const result = await this.boardService.deleteBoardGroupMember(
        boardId,
        userId,
      );

      return res.status(201).json({ message: '정상적으로 삭제됐습니다.' });
    } catch (err) {
      console.error(`Error in file: ${__filename}`);
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = BoardController;

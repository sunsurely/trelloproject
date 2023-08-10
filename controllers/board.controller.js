const MakeError = require('../utils/makeErrorUtil');
const BoardService = require('../services/board.service');

class BoardController {
  boardService = new BoardService();

  // 보드 등록(생성)
  createBoard = async (req, res, next) => {
    // userId는 임시로 body로 받아옴
    const { userId, name, color, description } = req.body;
    // userId = null;
    // console.log(name, color, description);
    // 유저 아이디 필요
    // 로그인 미들웨어 부분에서 유저 아이디 받아오면 될듯?
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
    try {
      const result = await this.boardService.getBoardList();
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
    try {
      const result = await this.boardService.getBoard(boardId);
      if (result) {
        return res
          .status(201)
          .json({ data: result, message: '보드 불러오기 성공' });
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

  updateBoard = async (req, res, next) => {
    const { name, color, description } = req.body;
    const { boardId } = req.params;

    try {
      const result = await this.boardService.updateBoard(
        boardId,
        name,
        color,
        description,
      );
      if (result) {
        return res
          .status(201)
          .json({
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

    try {
      const result = await this.boardService.deleteBoard(boardId);
      if (result) {
        return res.status(201).json({ message: '성공적으로 삭제됐습니다.' });
      } else {
        throw new MakeError(400, '업데이트에 실패하였습니다.');
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
}

// 아래 코드는 현재 환경에서는 동작 안되지만 노드 창에서 실행하면 잘 됨
// class BoardController {
//   //   test = new BoardService();
//   temp = 10;

//   // 보드 등록(생성)
//   async createBoard(req, res, next) {
//     const { name, color, description } = req.body;
//     console.log(name, color, description);
//     try {
//       console.log('!!!!!!!!!');
//       //   console.log(new BoardService());
//       console.log(this);
//       console.log(this.temp);
//     } catch (err) {
//       console.error(err);
//       return res.status(400).json({ message: 'error' });
//     }
//   }
// }

module.exports = BoardController;

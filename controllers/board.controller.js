// class BoardController {
//   boardService = new BoardService();

//   // 보드 등록(생성)
//   async createBoard(req, res, next) {
//     const { name, color, discription } = req.body;
//     // console.log(name, color, discription);
//     try {
//       const result = await this.boardService.createBoard(
//         name,
//         color,
//         discription,
//       );
//       if (result) {
//         return res.status(201).json({ message: '등록되었습니다.' });
//       }
//       else {
//         throw new MakeError(400, '문제가 발생하였습니다.');
//       }
//     } catch (err) {
//       console.error(`Error in file: ${__filename}`);
//       if (err instanceof MakeError) {
//         return res.status(err.code).json({ message: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//     }
//   }

//   async getBoardList(req, res, next) {
//     try {
//       console.log('🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗');
//       const result = await this.boardService.getBoardList();
//       console.log('🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗');
//       console.log(result);
//       if (result.length >= 0) {
//         return res
//           .status(201)
//           .json({ data: result, message: '보드들 불러오기 성공' });
//       } else {
//         throw new MakeError(
//           400,
//           '보드들을 불러오는 도중 문제가 발생하였습니다.',
//         );
//       }
//     } catch (err) {
//       console.error(`Error in file: ${__filename}`);
//       if (err instanceof MakeError) {
//         return res.status(err.code).json({ message: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//     }
//   }

//   async getBoard(req, res, next) {
//     const { boardId } = req.params;
//     try {
//       const result = await this.boardService.getBoard(id);
//       if (result) {
//         return res.status(201).json({ message: '보드 불러오기 성공' });
//       } else {
//         throw new MakeError(400, '보드를 불러오는 도중 문제가 발생하였습니다.');
//       }
//     } catch (err) {
//       console.error(`Error in file: ${__filename}`);
//       if (err instanceof MakeError) {
//         return res.status(err.code).json({ message: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//     }
//   }

//   async updateBoard(req, res, next) {
//     const { name, color, description } = req.body;
//     const { boardId } = req.params;

//     try {
//       const result = await this.boardService.updateBoard(
//         boardId,
//         name,
//         color,
//         description,
//       );
//       if (result) {
//         return res.status(201).json({ message: '수정이 완료됐습니다.' });
//       } else {
//         throw new MakeError(400, '수정을 실패하였습니다.');
//       }
//     } catch (err) {
//       console.error(`Error in file: ${__filename}`);
//       if (err instanceof MakeError) {
//         return res.status(err.code).json({ message: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//     }
//   }

//   async deleteBoard(req, res, next) {
//     const { boardId } = req.params;

//     try {
//       const result = await this.boardService.deleteBoard(boardId);
//       if (result) {
//         return res.status(201).json({ message: '성공적으로 삭제됐습니다.' });
//       } else {
//         throw new MakeError(400, '업데이트에 실패하였습니다.');
//       }
//     } catch (err) {
//       console.error(`Error in file: ${__filename}`);
//       if (err instanceof MakeError) {
//         return res.status(err.code).json({ message: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//     }
//   }
// }

const MakeError = require('../utils/makeErrorUtil');
const BoardService = require('../services/board.service');

class BoardController {
  //   test = new BoardService();
  temp = 10;

  // 보드 등록(생성)
  createBoard = async (req, res, next) => {
    const { name, color, discription } = req.body;
    console.log(name, color, discription);
    try {
      console.log('!!!!!!!!!');
      //   console.log(new BoardService());
      console.log(this.temp);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = BoardController;

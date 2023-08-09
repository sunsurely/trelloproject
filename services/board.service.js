const MakeError = require('../utils/makeErrorUtil');
const BoardRespotisoty = require('../repositories/board.repository');

// class BoardService {
//   boardRepo = new BoardRespotisoty();

//   static async createBoard(name, color, discription) {
//     const result = await this.boardRepo.createBoard(name, color, discription);
//     if (!name) {
//       throw new MakeError(412, '이름이 입력되지 않았습니다.');
//     }
//     if (!color) {
//       throw new MakeError(412, '컬러 값이 입력되지 않았습니다.');
//     }
//     if (!discription) {
//       throw new MakeError(412, '설명이 입력되지 않았습니다.');
//     }

//     if (!result) {
//       throw new MakeError(400, '보드 생성에 실패하였습니다.');
//     }

//     return result;
//   }

//   async getBoardList() {
//     const result = await this.boardRepo.getBoards();

//     if (!result) {
//       throw new MakeError(500, 'Interval Server Error');
//     }

//     return result;
//   }

//   async getBoard(id) {
//     const result = await this.boardRepo.getBoard(id);

//     if (!result) {
//       throw new MakeError(404, '보드가 존재하지 않습니다.');
//     }

//     return result;
//   }

//   async updateBoard(id, name, color, discription) {
//     const result = await this.boardRepo.updateBoard(
//       id,
//       name,
//       color,
//       discription,
//     );

//     if (!result) {
//       throw new MakeError(400, '업데이트가 실패하였습니다.');
//     }

//     return result;
//   }

//   async deleteBoard(id) {
//     const result = await this.boardRepo.deleteBoard(id);

//     if (!result) {
//       throw new MakeError(400, '삭제에 실패하였습니다.');
//     }

//     return result;
//   }
// }

class BoardService {
  createBoard = () => {
    console.log('create board!!');
  };
  getBoardList = () => {
    console.log('get board list');
  };
}

module.exports = BoardService;

const MakeError = require("../utils/makeErrorUtil");
const Board = require('../models/board');

class BoardRepository {
  // 같은 사용자가 같은 이름으로 만들려고 할 때 어떻게 해결 할 것인가?
  createBoard = async (userId, name, color, description) => {
    const result = await Board.create({ userId, name, color, description });

    return result;
  };

  getBoardList = async () => {
    const result = await Board.findAll();

    return result;
  };

  getBoard = async (id) => {
    const result = await Board.findByPk(id);

    return result;
  };

  updateBoard = async (id, name, color, description) => {
    // findByPk를 이용해서 데이터가 있는지 없는지 확인하는 것이 좋을까?
    // 아니면 db 부담을 줄이기 위해 굳이 없는 것은 신경 쓸 필요가 없을까?
    const result = await Board.update(
      { name, color, description },
      {
        where: {
          boardId: id,
        },
      },
    );

    return result;
  };

  deleteBoard = async (id) => {
    const existBoard = await Board.findByPk(id);
    if (existBoard) {
      return await Board.destroy({
        where: {
          boardId: id,
        },
      });
    }
    else {
        throw new MakeError(404, "Board is not exiting");
    }
  };
}

module.exports = BoardRepository;

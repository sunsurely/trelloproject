const MakeError = require('../utils/makeErrorUtil');
const Board = require('../models/board');

class BoardRepository {
  createBoard = async (userId, name, color, description, t) => {
    let result;
    if (!t) {
      result = await Board.create({
        ownerId: userId,
        name,
        color,
        description,
      });
    } else {
      result = await Board.create(
        { ownerId: userId, name, color, description },
        { transaction: t },
      );
    }

    return result;
  };

  // 보드 목록 조회 기능
  getBoardList = async (userId) => {
    const result = await Board.findAll({ where: { ownerId: userId } });

    return result;
  };

  // 보드 내용 불러오는 기능
  getBoard = async (boardId, t) => {
    let result;
    if (!t) {
      result = await Board.findByPk(boardId);
    } else {
      result = await Board.findOne({ where: { boardId }, transaction: t });
    }

    return result;
  };

  // 보드 정보 수정하는 기능
  modifyBoard = async (id, name, color, description) => {
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

  // 보드 삭제하는 기능
  deleteBoard = async (id) => {
    const existBoard = await Board.findByPk(id);
    if (existBoard) {
      return await Board.destroy({
        where: {
          boardId: id,
        },
      });
    } else {
      throw new MakeError(404, 'Board is not exiting');
    }
  };
}

module.exports = BoardRepository;

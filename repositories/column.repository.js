const { Column, Board } = require('../models');

class ColumnRepository {
  // 컬럼 추가
  createColumn = async (boardId, name, position) =>
    await Column.create({ boardId, name, position });

  // boardId 찾기
  findOneBoardDataByBoardId = async (boardId) =>
    await Board.findOne({ where: { boardId } });
}

module.exports = ColumnRepository;

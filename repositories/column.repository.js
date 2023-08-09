const { Column, Board } = require('../models');

class ColumnRepository {
  // 컬럼 추가
  createColumn = async (boardId, name, position) =>
    await Column.create({ boardId, name, position });

  // boardId 찾기
  findOneBoardDataByBoardId = async (boardId) =>
    await Board.findOne({ where: { boardId } });

  // 컬럼 조회
  getAllColumns = async (boardId) =>
    await Column.findAll({
      where: { boardId },
      attributes: ['columnId', 'name', 'position'],
      order: [['position', 'DESC']],
    });

  // 컬럼 수정(name)
  modifyNameOfColumn = async (columnId, name) =>
    await Column.update({ name }, { where: { columnId } });

  // 컬럼 데이터 찾기
  findOneColumnDataByCondition = async (condition) =>
    await Column.findOne({ where: condition });

  // 컬럼 수정(position)
  modifyPositionOfColumn = async (columnIdData, positionData, transaction) =>
    await Column.update(
      { position: positionData },
      { where: { columnId: columnIdData } },
      { transaction },
    );

  // 컬럼 삭제
  deleteColumn = async (columnId) =>
    await Column.destroy({ where: { columnId } });
}

module.exports = ColumnRepository;

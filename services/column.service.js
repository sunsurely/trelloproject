const ColumnRepository = require('../repositories/column.repository.js');
const MakeError = require('../utils/makeErrorUtil.js');

const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class ColumnService {
  columnRepository = new ColumnRepository();

  // 컬럼 추가
  createColumn = async (boardId, name, position) => {
    if (isNaN(boardId) || boardId < 1) {
      throw new MakeError(400, '잘못된 boardId입니다.');
    }

    if (!name) {
      throw new MakeError(400, '컬럼 이름을 입력해주세요.');
    }

    if (!position) {
      throw new MakeError(400, '컬럼 위치를 입력해주세요.');
    }

    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );
    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    await this.columnRepository.createColumn(boardId, name, position);
    return true;
  };

  // 컬럼 조회
  getAllColumns = async (boardId) => {
    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );
    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    return await this.columnRepository.getAllColumns(boardId);
  };

  // 컬럼 수정(name)
  modifyNameOfColumn = async (boardId, columnId, name) => {
    if (isNaN(boardId) || boardId < 1) {
      throw new MakeError(400, '잘못된 boardId 형식입니다.');
    }

    if (isNaN(columnId) || columnId < 1) {
      throw new MakeError(400, '잘못된 columnId 형식입니다.');
    }

    if (!name) {
      throw new MakeError(400, '수정할 컬럼 이름을 입력해주세요.');
    }

    const findColumnData =
      await this.columnRepository.findOneColumnDataByCondition({ columnId });
    if (!findColumnData) {
      throw new MakeError(400, '존재하지 않는 컬럼입니다.');
    }

    await this.columnRepository.modifyNameOfColumn(columnId, name);
    return true;
  };

  // 컬럼 수정(position)
  modifyPositionOfColumn = async (boardId, columnId, position) => {
    if (isNaN(boardId) || boardId < 1) {
      throw new MakeError(400, '잘못된 boardId 형식입니다.');
    }

    if (isNaN(columnId) || columnId < 1) {
      throw new MakeError(400, '잘못된 columnId 형식입니다.');
    }

    if (!position) {
      throw new MakeError(400, '수정할 컬럼 위치를 입력해주세요.');
    }

    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const findColumnData =
        await this.columnRepository.findOneColumnDataByCondition({ columnId });
      if (!findColumnData) {
        throw new MakeError(400, '존재하지 않는 컬럼입니다.');
      }

      const originalPosition = findColumnData.position;

      const columnWithNewPosition =
        await this.columnRepository.findOneColumnDataByCondition({
          boardId,
          position,
        });

      const columnWithNewPositionColumnId = columnWithNewPosition.columnId;

      await this.columnRepository.modifyPositionOfColumn(
        columnId,
        position,
        transaction,
      );

      await this.columnRepository.modifyPositionOfColumn(
        columnWithNewPositionColumnId,
        originalPosition,
        transaction,
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

    return true;
  };

  // 컬럼 삭제
  deleteColumn = async (boardId, columnId) => {
    if (isNaN(boardId) || boardId < 1) {
      throw new MakeError(400, '잘못된 boardId 형식입니다.');
    }

    if (isNaN(columnId) || columnId < 1) {
      throw new MakeError(400, '잘못된 columnId 형식입니다.');
    }

    const findColumnData =
      await this.columnRepository.findOneColumnDataByCondition({ columnId });
    if (!findColumnData) {
      throw new MakeError(400, '존재하지 않는 컬럼입니다.');
    }

    await this.columnRepository.deleteColumn(columnId);
    return;
  };
}

module.exports = ColumnService;

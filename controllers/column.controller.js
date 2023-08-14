const ColumnService = require('../services/column.service.js');
const { catchError } = require('../utils/catchErrorUtil.js');

class ColumnController {
  columnService = new ColumnService();

  // 컬럼 추가
  createColumn = async (req, res) => {
    try {
      const { boardId } = req.params;
      const { name, position } = req.body.data;

      await this.columnService.createColumn(boardId, name, position);
      return res.status(201).json({ message: '컬럼을 추가하였습니다.' });
    } catch (err) {
      catchError(err, 'ColumnController_createColumn', res);
    }
  };

  // 컬럼 조회
  getAllColumns = async (req, res) => {
    try {
      const { boardId } = req.params;

      const columnList = await this.columnService.getAllColumns(boardId);
      return res
        .status(200)
        .json({ message: '컬럼 조회에 성공하였습니다.', columnList });
    } catch (err) {
      catchError(err, 'ColumnController_getAllColumns', res);
    }
  };

  // 컬럼 수정(name)
  modifyNameOfColumn = async (req, res) => {
    try {
      const { boardId, columnId } = req.params;
      const { name } = req.body.data;

      await this.columnService.modifyNameOfColumn(boardId, columnId, name);
      return res.status(200).json({ message: '컬럼 이름이 수정되었습니다.' });
    } catch (err) {
      catchError(err, 'ColumnController_modifyNameOfColumn', res);
    }
  };

  // 컬럼 수정(position)
  modifyPositionOfColumn = async (req, res) => {
    try {
      const { boardId, columnId } = req.params;
      const { position } = req.body.data;

      await this.columnService.modifyPositionOfColumn(
        boardId,
        columnId,
        position,
      );
      return res.status(200).json({ message: '컬럼 위치가 수정되었습니다.' });
    } catch (err) {
      catchError(err, 'ColumnController_modifyPositionOfColumn', res);
    }
  };

  // 컬럼 삭제
  deleteColumn = async (req, res) => {
    try {
      const { boardId, columnId } = req.params;

      await this.columnService.deleteColumn(boardId, columnId);
      return res.status(200).json({ message: '컬럼을 삭제하였습니다.' });
    } catch (err) {
      catchError(err, 'ColumnController_deleteColumn', res);
    }
  };
}

module.exports = ColumnController;

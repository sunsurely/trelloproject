const ColumnService = require('../services/column.service.js');
const MakeError = require('../utils/makeErrorUtil.js');

class ColumnController {
  columnService = new ColumnService();

  // 컬럼 추가
  createColumn = async (req, res) => {
    try {
      const { boardId } = req.params;
      const { name, position } = req.body;

      await this.columnService.createColumn(boardId, name, position);
      return res.status(201).json({ message: '컬럼을 추가하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 컬럼 조회
  getAllColumns = async (req, res) => {
    try {
      const { boardId } = req.params;
      const columnList = await this.columnService.getAllColumns(boardId);

      return res.status(200).json({ columnList });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 컬럼 수정(name)
  modifyNameOfColumn = async (req, res) => {
    try {
      const { boardId, columnId } = req.params;
      const { name } = req.body;

      await this.columnService.modifyNameOfColumn(boardId, columnId, name);
      return res.status(200).json({ message: '컬럼 이름이 수정되었습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 컬럼 삭제
  deleteColumn = async (req, res) => {
    try {
      const { boardId, columnId } = req.params;

      await this.columnService.deleteColumn(boardId, columnId);
      return res.status(200).json({ message: '컬럼을 삭제하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = ColumnController;

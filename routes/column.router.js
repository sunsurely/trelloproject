const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/column.controller.js');
const columnController = new ColumnController();

// 컬럼 추가
router.post('/:boardId/column', columnController.createColumn);

// 컬럼 조회
router.get('/:boardId/column', columnController.getAllColumns);

// 컬럼 수정(name)
router.put(
  '/:boardId/column/:columnId/name',
  columnController.modifyNameOfColumn,
);

module.exports = router;

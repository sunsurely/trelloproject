const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/column.controller.js');
const columnController = new ColumnController();

// 컬럼 추가
router.post('/:boardId/column', columnController.createColumn);

module.exports = router;

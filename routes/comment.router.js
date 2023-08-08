const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments.controller');

const commentController = new CommentController();

router.post('/cards/comments', commentController.createComment);
router.get('/boards/cards/:cardId/comments', commentController.getAllComments);
router.get('/cards/comments', commentController.getComment); // /boards/cards/comments?commentId=commentId   쿼리로 수신
router.delete('/cards/comments', commentController.deleteComment); // /boards/cards/comments?commentId=commentId&userId=userId  쿼리로 수신

module.exports = router;

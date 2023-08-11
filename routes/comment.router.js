const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments.controller');
const { authorizated } = require('../middleware/userState.middleware');

const commentController = new CommentController();

router.post(
  '/cards/:cardId/comments/',
  authorizated,
  commentController.createComment,
);
router.get('/cards/:cardId/comments', commentController.getAllComments);
router.get('/cards/comments/:commentId', commentController.getComment); // /boards/cards/comments?commentId=commentId   쿼리로 수신
router.delete(
  '/cards/comments/:commentId',
  authorizated,
  commentController.deleteComment,
); // /boards/cards/comments?commentId=commentId&userId=userId  쿼리로 수신

module.exports = router;

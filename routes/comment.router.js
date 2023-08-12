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
router.get('/cards/comments/:commentId', commentController.getComment);
router.delete(
  '/cards/comments/:commentId',
  authorizated,
  commentController.deleteComment,
);

module.exports = router;

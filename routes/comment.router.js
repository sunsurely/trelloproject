const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments.controller');
const {
  authorizated,
  hasMinimumPermission,
} = require('../middleware/userState.middleware');

const commentController = new CommentController();

router.post(
  '/cards/:cardId/comments/',
  authorizated,
  hasMinimumPermission('write'),
  commentController.createComment,
);
router.get('/cards/:cardId/comments', commentController.getAllComments);
router.delete(
  '/cards/comments/:commentId',
  authorizated,
  hasMinimumPermission('write'),
  commentController.deleteComment,
);

module.exports = router;

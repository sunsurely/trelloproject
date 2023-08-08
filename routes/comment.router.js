const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments.controller');

const commentController = new CommentController();

// router.post('/cards/comments', commentController.createComment);
// router.get('/cards/:commentId', commentController.getComment);
// router.delete('/cards/:commentId', commentController.deleteComment);

module.exports = router;

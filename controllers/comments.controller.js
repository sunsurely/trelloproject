const CommentService = require('../services/comments.service');
const { catchError } = require('../utils/catchErrorUtil');
class CommentController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    const userId = res.locals.userId;
    const cardId = req.params.cardId;
    const { content } = req.body;
    try {
      await this.commentService.createComment(userId, cardId, content);

      res
        .status(201)
        .json({ sucess: true, message: '댓글등록에 성공했습니다.' });
    } catch (err) {
      catchError(err, 'commentController_createComment');
    }
  };

  getAllComments = async (req, res) => {
    try {
      const cardId = req.params.cardId;

      const getAllCommentsResult = await this.commentService.getAllComments(
        cardId,
      );
      res
        .status(200)
        .json({ message: '댓글조회성공', data: getAllCommentsResult });
    } catch (err) {
      catchError(err, 'commentController_getAllComment');
    }
  };

  getComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;

      const getCommentResult = await this.commentService.getComment(commentId);
      res.status(200).json({ message: '댓글조회성공', getCommentResult });
    } catch (err) {
      catchError(err, 'getComment');
    }
  };

  deleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const userId = res.locals.userId;

      const deleteCommentResult = await this.commentService.deleteComment(
        userId,
        commentId,
      );

      res
        .status(201)
        .json({ message: '댓글을 삭제했습니다.', data: deleteCommentResult });
    } catch (err) {
      catchError(err, 'CardController_deleteDeleteComment');
    }
  };
}

module.exports = CommentController;

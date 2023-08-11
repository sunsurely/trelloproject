const CommentService = require('../services/comments.service');

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
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CommentController_createComment', err);
      res.status(500).json({ message: 'Server Error' });
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
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CommentController_getAllComments', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  getComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;

      const getCommentResult = await this.commentService.getComment(commentId);
      res.status(200).json({ message: '댓글조회성공', getCommentResult });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CommentController_getComment', err);
      res.status(500).json({ message: 'Server Error' });
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
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CommentController_deleteComment', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = CommentController;

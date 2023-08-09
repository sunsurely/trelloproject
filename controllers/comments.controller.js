const CommentService = require('../services/comments.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    const userId = parseInt(req.query.userId);
    const cardId = parseInt(req.query.cardId);
    const { content } = req.body;
    try {
      if (!userId) {
        return res
          .status(400)
          .json({ errorMessage: 'userId를 수신받지 못했습니다.' });
      }
      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }
      if (!content) {
        return res.status(400).json({ errorMessage: '내용이 없습니다.' });
      }

      await this.commentService.createComment(userId, cardId, content);

      res
        .status(201)
        .json({ sucess: true, message: '댓글등록에 성공했습니다.' });
    } catch (err) {
      console.error('CommentController_createComment', err);
      res.status(402).json({ error: err });
    }
  };

  getAllComments = async (req, res) => {
    try {
      const cardId = parseInd(req.query.cardId);
      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }
      const getAllCommentsResult = await this.commentService.getALlcomments(
        cardId,
      );
      res
        .status(200)
        .json({ message: '댓글조회성공', data: getAllCommentsResult });
    } catch (err) {
      console.error('CommentController_getComment', error);
      res.status(400).json({ message: error });
    }
  };

  getComment = async (req, res) => {
    try {
      const commentId = parseInd(req.query.commentId);
      if (!commentId) {
        return res
          .status(400)
          .json({ errorMessage: 'commentId를 수신받지 못했습니다.' });
      }
      const getCommentResult = await this.commentService.getcomment(columnId);
      res.status(200).json({ message: '댓글조회성공', data: getCommentResult });
    } catch (err) {
      console.error('CommentController_getComment', error);
      res.status(400).json({ message: error });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const commentId = parseInt(req.query.commentId);
      if (!commentId) {
        return res
          .status(400)
          .json({ errorMessage: 'commentId를 수신받지 못했습니다.' });
      }
      const deleteCommentResult = await this.commentService.deleteComment(
        userID,
        commentId,
      );

      res
        .status(201)
        .json({ message: '댓글을 삭제했습니다.', data: deleteCommentResult });
    } catch (err) {
      console.error('CommentController_deleteComment', err);
      res.status(401).json({ errorMessage: err });
    }
  };
}

module.exports = CommentController;

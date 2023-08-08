const CommentRepo = require('../repositories/comments.repository');
const { MakeError } = require('../utils/makeErrorUtil');

class CommentService {
  commentRepo = new CommentRepo();

  createComment = async (userId, cardId, content) => {
    try {
      const createCommentResult = await this.commentRepo.createComment(
        userId,
        cardId,
        content,
      );
      if (!createCommentResult) {
        throw new MakeError(402, '댓글등록에 실패했습니다.');
      }
    } catch (err) {
      console.error('CommentService_createComment', err);
      throw err;
    }
  };

  getAllComments = async (cardId) => {
    try {
      const getCommentsResult = await this.cardRepo.getAllComment(cardId);

      if (getCommentsResult.length === 0) {
        throw new MakeError(400, '데이터가 존재하지 않습니다.');
      }

      return getCommentsResult;
    } catch (err) {
      console.error('CommentService_CommentAllComments', error);
      throw error;
    }
  };

  getComment = async (commentId) => {
    try {
      const getCommentResult = await this.commentRepo.getComment(commentId);

      if (!getCommentResult) {
        throw new MakeError(400, '해당 댓글이 존재하지 않습니다.');
      }

      return getCommentResult;
    } catch (err) {
      console.error('CommentService_CommentComment', error);
      throw error;
    }
  };

  deleteComment = async (userId, commentId) => {
    try {
      const deleteCommentResult = await this.commentRepo.deleteComment(
        userId,
        commentId,
      );
      if (!deleteCommentResult) {
        throw new MakeError('402', '해당 댓글을 삭제하지 못했습니다.');
      }
      return deleteCommentResult;
    } catch (err) {
      console.error('CommentService_deleteComment', err);
      throw err;
    }
  };
}

module.exports = CommentService;

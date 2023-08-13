const CommentRepo = require('../repositories/comments.repository');
const MakeError = require('../utils/makeErrorUtil');

class CommentService {
  commentRepo = new CommentRepo();

  //댓글 등록
  createComment = async (userId, cardId, content) => {
    try {
      if (!userId) {
        throw new MakeError(400, 'userId를 수신받지 못했습니다.');
      }
      if (isNaN(userId) || userId < 1) {
        throw new MakeError(400, 'userId가 유효한 형식이 아닙니다.');
      }
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }
      if (isNaN(cardId) || cardId < 1) {
        throw new MakeError(400, 'cardId가 유효한 형식이 아닙니다.');
      }
      if (!content) {
        throw new MakeError(400, '내용을 입력해 주세요.');
      }
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

  //해당 카드의 모든 댓글 조회
  getAllComments = async (cardId) => {
    try {
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }
      if (isNaN(cardId) || cardId < 1) {
        throw new MakeError(400, 'cardId가 유효한 형식이 아닙니다.');
      }
      const getCommentsResult = await this.commentRepo.getAllComments(cardId);

      if (getCommentsResult.length === 0) {
        throw new MakeError(400, '데이터가 존재하지 않습니다.');
      }

      return getCommentsResult;
    } catch (err) {
      console.error('CommentService_CommentAllComments', err);
      throw err;
    }
  };

  //댓글 상세조회
  getComment = async (commentId) => {
    try {
      if (!commentId) {
        throw new MakeError(400, 'commentId를 수신받지 못했습니다.');
      }
      if (isNaN(commentId) || commentId < 1) {
        throw new MakeError(400, 'commentId가 올바른 형식이 아닙니다.');
      }
      const getCommentResult = await this.commentRepo.getComment(commentId);

      if (!getCommentResult) {
        throw new MakeError(400, '해당 댓글이 존재하지 않습니다.');
      }

      return getCommentResult;
    } catch (err) {
      console.error('CommentService_CommentComment', err);
      throw err;
    }
  };

  //댓글 삭제
  deleteComment = async (userId, commentId) => {
    try {
      if (!commentId) {
        throw MakeError(400, 'commentId를 수신받지 못했습니다.');
      }
      if (isNaN(commentId) || commentId < 1) {
        throw new MakeError(400, 'commentId가 유효한 형식이 아닙니다.');
      }
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

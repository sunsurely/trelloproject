const Comment = require('../models/comment');

class CommentRepo {
  //댓글등록
  createComment = async (userId, cardId, content) => {
    const createCardResult = await Comment.create({
      userId,
      cardId,
      content,
    });
    return createCardResult;
  };

  //해당카드의 모든 댓글 조회
  getAllComments = async (cardId) => {
    const getCommentsResult = await Comment.findAll({
      where: { cardId },
      attributes: ['commentId', 'content', 'createdAt'],
    });
    return getCommentsResult;
  };

  //댓글 상세조회
  getComment = async (commentId) => {
    const getCommentResult = await Comment.findOne({
      where: { commentId },
      attributes: ['commentId', 'content', 'createdAt'],
    });

    return getCommentResult;
  };

  //댓글 삭제
  deleteComment = async (userId, commentId) => {
    const deleteCommentResult = await Comment.destroy({
      where: { commentId, userId },
    });
    return deleteCommentResult;
  };
}

module.exports = CommentRepo;

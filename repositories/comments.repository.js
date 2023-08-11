const Comment = require('../models/comment');
const { Op } = require('sequelize');

class CommentRepo {
  createComment = async (userId, cardId, content) => {
    const createCardResult = await Comment.create({
      userId,
      cardId,
      content,
    });

    return createCardResult;
  };

  getAllComments = async (cardId) => {
    const getCommentsResult = await Comment.findAll({
      where: { cardId },
      attributes: ['commentId', 'content', 'createdAt'],
    });
    console.log(getCommentsResult);
    return getCommentsResult;
  };

  getComment = async (commentId) => {
    const getCommentResult = await Comment.findOne({
      where: { commentId },
      attributes: ['commentId', 'content', 'createdAt'],
    });

    return getCommentResult;
  };

  deleteComment = async (userId, commentId) => {
    const deleteCommentResult = await Comment.destroy({
      where: { commentId, userId },
    });

    return deleteCommentResult[0];
  };
}

module.exports = CommentRepo;

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

  getCards = async (columnId) => {
    const getCardsResult = await Card.findAll({
      where: { columnId },
      attributes: [
        'cardId',
        'name',
        'description',
        'position',
        'deadline',
        'createdAt',
      ],
    });

    return getCardresult;
  };

  updateCard = async (cardId, name, description, position, deadline) => {
    const updateCardResult = await Card.update(
      { name, description, position, deadline },
      { where: { cardId } },
    );

    return updateCardResult;
  };

  deleteCard = async (cardId) => {
    const deleteCardResult = await Card.destroy({ where: { cardId } });

    return deleteCardResult[0];
  };
}

module.exports = CommentRepo;

const Card = require('../models/card');
const { Op } = require('sequelize');

class CardRepo {
  createCard = async (columnId, description, position, deadline, manager) => {
    const createCardResult = await Card.create({
      columnId,
      description,
      position,
      deadline,
      manager,
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
        'manager',
        'createdAt',
      ],
    });

    return getCardsResult;
  };

  modifyCard = async (cardId, name, description, deadline, manager) => {
    const updateCardResult = await Card.update(
      { name, description, deadline, manager },
      { where: { cardId } },
    );

    return updateCardResult;
  };

  deleteCard = async (cardId) => {
    const deleteCardResult = await Card.destroy({ where: { cardId } });

    return deleteCardResult[0];
  };
}

module.exports = CardRepo;

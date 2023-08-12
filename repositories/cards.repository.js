const Card = require('../models/card');

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

  getAllCards = async (columnId) => {
    const getCardsResult = await Card.findAll({
      where: { columnId },
      attributes: [
        'cardId',
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
      { description, deadline, manager },
      { where: { cardId } },
    );

    return updateCardResult[0];
  };

  modifyCardPosition = async (positionInfo, t) => {
    const updateCardPositonResult = await Card.update(
      { position: positionInfo.position },
      { where: { cardId: positionInfo.cardId }, t },
    );

    return updateCardPositonResult;
  };

  deleteCard = async (cardId) => {
    const deleteCardResult = await Card.destroy({ where: { cardId } });

    return deleteCardResult[0];
  };
}

module.exports = CardRepo;

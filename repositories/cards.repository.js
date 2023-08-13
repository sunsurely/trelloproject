const Card = require('../models/card');

class CardRepo {
  //카드 생성
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
  //전체 카드 조회
  getAllCards = async (columnId) => {
    const getCardsResult = await Card.findAll({
      where: { columnId },
      attributes: [
        'cardId',
        'columnId',
        'description',
        'position',
        'deadline',
        'manager',
        'createdAt',
      ],
    });

    return getCardsResult;
  };
  //카드 내용수정
  modifyCard = async (cardId, description, deadline, manager) => {
    const updateCardResult = await Card.update(
      { description, deadline, manager },
      { where: { cardId } },
    );

    return updateCardResult[0];
  };
  //카드 위치변경
  modifyCardPosition = async (positionInfo, t) => {
    const updateCardPositonResult = await Card.update(
      { position: positionInfo.position },
      { where: { cardId: positionInfo.cardId }, t },
    );

    return updateCardPositonResult;
  };
  //카드삭제
  deleteCard = async (cardId) => {
    const deleteCardResult = await Card.destroy({ where: { cardId } });

    return deleteCardResult;
  };
}

module.exports = CardRepo;

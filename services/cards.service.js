const CardRepo = require('../repositories/cards.repository');
const { Transaction } = require('sequelize');
const MakeError = require('../utils/makeErrorUtil');

class CardService {
  cardRepo = new CardRepo();

  createCard = async (columnId, description, deadline, manager) => {
    try {
      if (!columnId) {
        throw new MakeError(400, 'columnId가 존재하지 않습니다.');
      }
      if (!description) {
        throw new MakeError(400, 'description은 필수 입력사항입니다.');
      }

      const createCardResult = await this.cardRepo.createCard(
        columnId,
        description,
        deadline,
        manager,
      );
      if (!createCardResult) {
        throw new MakeError(402, '카드 등록에 실패했습니다.');
      }
    } catch (err) {
      console.error('CardService_createCard', err);
      throw err;
    }
  };

  getAllCards = async (columnId) => {
    try {
      if (!columnId) {
        throw new MakeError(400, 'columnId가 존재하지 않습니다.');
      }
      const getCardsResult = await this.cardRepo.getAllCards(columnId);

      if (!getCardsResult) {
        throw new MakeError(400, '해당 카드가 존재하지 않습니다.');
      }

      return getCardsResult;
    } catch (err) {
      console.error('CardService_getCards', error);
      throw error;
    }
  };

  modifyCard = async (
    cardId,
    name,
    description,
    position,
    deadline,
    manager,
  ) => {
    try {
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }

      const updateCardResult = await this.cardRepo.modifyCard(
        cardId,
        name,
        description,
        position,
        deadline,
        manager,
      );

      if (!updateCardResult) {
        throw new MakeError(402, '카드 수정에 실패했습니다.');
      }

      return updateCardResult;
    } catch (err) {
      console.error('CardService_UpdateCard', err);
      throw err;
    }
  };

  modifyCardPosition = async (positionInfos) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      if (!positionInfos.length === 0) {
        throw new MakeError(400, 'positionInfos가 존재하지 않습니다.');
      }
      const resultFirst = await this.cardRepo.modifyCardPosition(
        positionInfos[0],
        t,
      );
      const resultSecond = await this.cardRepo.modifyCardPosition(
        positionInfos[1],
        t,
      );

      if (!resultFirst || !resultSecond) {
        throw new MakeError(402, 'position 수정에 실패했습니다.');
      }

      await t.commit();
    } catch (err) {
      console.error('CardService_UpdateCardPostion', err);
      await t.rollback();
      throw error;
    }
  };

  deleteCard = async (cardId) => {
    try {
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }
      const deleteCardResult = await this.cardRepo.deleteCard(cardId);
      if (!deleteCardResult) {
        throw new MakeError('402', '해당 카드를 삭제하지 못했습니다.');
      }
      return deleteCardResult;
    } catch (err) {
      console.error('CardService_deleteCared', err);
      throw err;
    }
  };
}

module.exports = CardService;

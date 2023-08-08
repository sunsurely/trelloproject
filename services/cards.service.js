const CardRepo = require('../repositories/cards.repository');
const { MakeError } = require('../utils/makeErrorUtil');

class CardService {
  cardRepo = new CardRepo();

  createCard = async (columnId, description, position, deadline) => {
    try {
      const createCardResult = await this.cardRepo.createCard(
        columnId,
        description,
        position,
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

  getCards = async (columnId) => {
    try {
      const getCardsResult = await this.cardRepo.getCards(columnId);

      if (!getCardsResult) {
        throw new MakeError(400, '해당 카드가 존재하지 않습니다.');
      }

      return getCardsResult;
    } catch (err) {
      console.error('CardService_getCards', error);
      throw error;
    }
  };

  updateCard = async (
    cardId,
    name,
    description,
    position,
    deadline,
    manager,
  ) => {
    try {
      const updateCardResult = await this.cardRepo.updateCard(
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

  deleteCard = async (cardId) => {
    try {
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

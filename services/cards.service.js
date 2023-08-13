const CardRepo = require('../repositories/cards.repository');
const { Transaction } = require('sequelize');
const MakeError = require('../utils/makeErrorUtil');
const { sequelize } = require('../models');

class CardService {
  cardRepo = new CardRepo();

  //카드 생성
  createCard = async (columnId, description, position, deadline, manager) => {
    try {
      if (!columnId) {
        throw new MakeError(400, 'columnId가 존재하지 않습니다.');
      }
      if (isNaN(columnId) || columnId < 1) {
        throw new MakeError(400, 'column이 올바른 형식이 아닙니다.');
      }
      if (!description) {
        throw new MakeError(400, 'description은 필수 입력사항입니다.');
      }
      if (position) {
        if (isNaN(position) || columnId < 1) {
          throw new MakeError(400, 'position이 올바른 형식이 아닙니다.');
        }
      }

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
      return createCardResult;
    } catch (err) {
      console.error('CardService_createCard', err);
      throw err;
    }
  };

  //해당 보드의 컬럼의 모든 카드 조회
  getAllCards = async (columnId) => {
    try {
      if (!columnId) {
        throw new MakeError(400, 'columnId가 존재하지 않습니다.');
      }
      if (isNaN(columnId) || columnId < 1) {
        throw new MakeError(400, 'column이 올바른 형식이 아닙니다.');
      }
      const getCardsResult = await this.cardRepo.getAllCards(columnId);

      if (!getCardsResult) {
        throw new MakeError(400, '해당 카드가 존재하지 않습니다.');
      }

      return getCardsResult;
    } catch (err) {
      console.error('CardService_getCards', err);
      throw err;
    }
  };

  //카드수정
  modifyCard = async (cardId, description, position, deadline, manager) => {
    try {
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }
      if (isNaN(cardId) || cardId < 1) {
        throw new MakeError(400, 'column이 올바른 형식이 아닙니다.');
      }

      const updateCardResult = await this.cardRepo.modifyCard(
        cardId,
        description,
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

  //카드 위치수정
  modifyCardPosition = async (positionInfos) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      if (positionInfos.length <= 0) {
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
      throw err;
    }
  };

  //카드삭제
  deleteCard = async (cardId) => {
    try {
      if (!cardId) {
        throw new MakeError(400, 'cardId를 수신받지 못했습니다.');
      }
      if (isNaN(cardId) || cardId < 1) {
        throw new MakeError(400, 'column이 올바른 형식이 아닙니다.');
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

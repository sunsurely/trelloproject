const CardService = require('../services/cards.service');
const { catchError } = require('../utils/catchErrorUtil');

class CardController {
  cardService = new CardService();

  //카드 등록
  createCard = async (req, res) => {
    const columnId = req.params.columnId;
    const { description, position, deadline, manager } = req.body.data;
    try {
      const createCardResult = await this.cardService.createCard(
        columnId,
        description,
        position,
        deadline,
        manager,
      );

      res.status(201).json({
        sucess: true,
        message: '카드등록에 성공했습니다.',
        createCardResult,
      });
    } catch (err) {
      catchError(err, 'CardController_createCard', res);
    }
  };

  //해당 보드의 컬럼에 해당하는 모든 카드 조회
  getAllCards = async (req, res) => {
    try {
      const columnId = req.params.columnId;

      const getCardsResult = await this.cardService.getAllCards(columnId);

      res.status(200).json({ message: '카드조회성공', data: getCardsResult });
    } catch (err) {
      catchError(err, 'CardController_getAllCard', res);
    }
  };

  //카드 내용 수정
  modifyCard = async (req, res) => {
    try {
      const { description, deadline, manager } = req.body.data;
      const cardId = req.params.cardId;

      await this.cardService.modifyCard(cardId, description, deadline, manager);
      res.status(201).json({ message: '카드수정성공' });
    } catch (err) {
      catchError(err, 'CardController_modifyCard', res);
    }
  };

  //카드 위치 변경
  modifyCardPosition = async (req, res) => {
    try {
      const positionInfos = req.body.data;
      await this.cardService.modifyCardPosition(positionInfos);
      res.status(201).json({ message: '카드 위치이동 성공' });
    } catch (err) {
      catchError(err, 'CardController_deleteCardPosition', res);
    }
  };

  //카드 삭제
  deleteCard = async (req, res) => {
    try {
      const cardId = req.params.cardId;

      const deleteCartResult = await this.cardService.deleteCard(cardId);

      res.status(201).json({
        message: '카드를 삭제했습니다.',
        data: deleteCartResult,
      });
    } catch (err) {
      catchError(err, 'CardController_deleteCard', res);
    }
  };
}

module.exports = CardController;

const CardService = require('../services/cards.service');

class CardController {
  cardService = new CardService();

  createCard = async (req, res) => {
    const columnId = parseInt(req.params.columnId);
    const { description, position, deadline, manager } = req.body;
    try {
      if (!columnId) {
        return res
          .status(400)
          .json({ errorMessage: 'columnId를 수신받지 못했습니다.' });
      }
      if (!description) {
        return res
          .status(400)
          .json({ errorMessage: 'description은 필수 입력사항입니다.' });
      }
      if (!deadline) {
        return res
          .status(400)
          .json({ errorMessage: 'deadline은 필수 입력사항입니다.' });
      }

      await this.cardService.createCard(
        columnId,
        description,
        position,
        deadline,
        manager,
      );

      res
        .status(201)
        .json({ sucess: true, message: '카드등록에 성공했습니다.' });
    } catch (err) {
      console.error('CardController_createCard', err);
      res.status(402).json({ error: err });
    }
  };

  getCards = async (req, res) => {
    try {
      const columnId = parseInd(req.params.columnId);
      if (!columnId) {
        return;
      }
      const getCardsResult = await this.cardService.getCards(columnId);

      res.status(200).json({ message: '카드조회성공', data: getCardsResult });
    } catch (err) {
      console.error('CardController_getCards', error);
      res.status(400).json({ message: error });
    }
  };

  modifyCard = async (req, res) => {
    try {
      const { name, description, deadline, manager } = req.body;
      const cardId = parseInt(req.params.cardId);

      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }

      const updateCardResult = await this.cardService.modifyCard(
        cardId,
        name,
        description,
        deadline,
        manager,
      );

      res.status(201).json({ message: '카드수정성공', data: updateCardResult });
    } catch (err) {
      console.error('CardController_updateCard', err);
    }
  };

  deleteCard = async (req, res) => {
    try {
      const cardId = parseInt(req.params.cardId);
      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }
      const deleteCartResult = await this.cardService.deleteCard(cardId);

      res
        .status(201)
        .json({ message: '카드를 삭제했습니다.', data: deleteCartResult });
    } catch (err) {
      console.error('CardController_deleteCared', err);
      res.status(401).json({ errorMessage: err });
    }
  };
}

module.exports = CardController;

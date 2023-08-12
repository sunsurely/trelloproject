const CardService = require('../services/cards.service');
const MakeError = require('../utils/makeErrorUtil');

class CardController {
  cardService = new CardService();

  createCard = async (req, res) => {
    const columnId = req.params.columnId;
    const { description, position, deadline, manager } = req.body;
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
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CardController_createCard', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  getAllCards = async (req, res) => {
    try {
      const columnId = req.params.columnId;

      const getCardsResult = await this.cardService.getAllCards(columnId);

      res.status(200).json({ message: '카드조회성공', data: getCardsResult });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CardController_getAllCards', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  modifyCard = async (req, res) => {
    try {
      const { name, description, deadline, manager } = req.body;
      const cardId = req.params.cardId;

      await this.cardService.modifyCard(cardId, description, deadline, manager);
      res.status(201).json({ message: '카드수정성공' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CardController_modifyCard', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  modifyCardPosition = async (req, res) => {
    try {
      const positionInfos = req.body;
      await this.cardService.modifyCardPosition(positionInfos);
      res.status(201).json({ message: '카드 위치이동 성공' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CardController_modifyCardPosition', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  deleteCard = async (req, res) => {
    try {
      const cardId = req.params.cardId;

      const deleteCartResult = await this.cardService.deleteCard(cardId);

      res
        .status(201)
        .json({ message: '카드를 삭제했습니다.', data: deleteCartResult });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('CardController_deleteCard', err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = CardController;

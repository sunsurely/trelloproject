const CardService = require('../services/cards.service');

class CardController {
  cardService = new CardService();

  createCard = async (req, res) => {
    const columnId = parseInt(req.params.columnId);
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
        data: createCardResult,
      });
    } catch (err) {
      console.error('CardController_createCard', err);
      res.status(402).json({ error: err });
    }
  };

  getAllCards = async (req, res) => {
    try {
      const columnId = parseInd(req.params.columnId);

      const getCardsResult = await this.cardService.getAllCards(columnId);

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

      const updateCardResult = await this.cardService.modifyCard(
        cardId,
        name,
        description,
        deadline,
        manager,
      );
      res.status(201).json({ message: '카드수정성공', updateCardResult });
    } catch (err) {
      console.error('CardController_updateCard', err);
      res.status(401).json({ message: error });
    }
  };

  modifyCardPosition = async (req, res) => {
    try {
      const { positionInfos } = req.body;

      await this.cardService.modifyCardPosition(positionInfos);
      res.status(201).json({ message: '카드 위치이동 성공' });
    } catch (err) {
      console.error('CardController_modifyCardPosition', err);
      res.status(401).json({ message: error });
    }
  };

  deleteCard = async (req, res) => {
    try {
      const cardId = parseInt(req.params.cardId);

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

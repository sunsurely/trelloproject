const CommentService = require('../services/comments.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    const userId = parseInt(req.query.userId);
    const cardId = parseInt(req.query.cardId);
    const { content } = req.body;
    try {
      if (!userId) {
        return res
          .status(400)
          .json({ errorMessage: 'userId를 수신받지 못했습니다.' });
      }
      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }
      if (!content) {
        return res.status(400).json({ errorMessage: '내용이 없습니다.' });
      }

      await this.cardService.createComment(userId, cardId, content);

      res
        .status(201)
        .json({ sucess: true, message: '댓글등록에 성공했습니다.' });
    } catch (err) {
      console.error('CommentController_createCard', err);
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

  updateCard = async (req, res) => {
    try {
      const { name, description, position, deadline, manager } = req.body;
      const cardId = parseInt(req.params.cardId);

      if (!cardId) {
        return res
          .status(400)
          .json({ errorMessage: 'cardId를 수신받지 못했습니다.' });
      }

      const updateCardResult = await this.cardService.updateCard(
        cardId,
        name,
        description,
        position,
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

module.exports = CommentController;

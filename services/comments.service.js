const CommentRepo = require('../repositories/comments.repository');
const { MakeError } = require('../utils/makeErrorUtil');

class CommentService {
  commentRepo = new CommentRepo();

  createCard = async (userId, cardId, content) => {
    try {
      const createCommentResult = await this.commentRepo.createComment(
        userId,
        cardId,
        content,
      );
      if (!createCommentResult) {
        throw new MakeError(402, '댓글등록에 실패했습니다.');
      }
    } catch (err) {
      console.error('CommentService_createCard', err);
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

module.exports = CommentService;

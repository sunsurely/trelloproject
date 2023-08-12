const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cards.controller');
const {
  isInvitedByPermission,
  authorizated,
} = require('../middleware/userState.middleware');

const cardController = new CardController();

router.post(
  '/column/:columnId/cards',
  authorizated,
  isInvitedByPermission('write'),
  cardController.createCard,
);
router.get('/column/:columnId/cards', authorizated, cardController.getAllCards);
router.put(
  '/column/columnId/cards/:cardId',
  authorizated,
  cardController.modifyCard,
);
router.put(
  '/column/cards/:cardId/position',
  authorizated,
  cardController.modifyCardPosition,
);
router.delete(
  '/column/columnId/cards/:cardId',
  authorizated,
  cardController.deleteCard,
);

module.exports = router;

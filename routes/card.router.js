const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cards.controller');
const {
  hasMinimumPermission,
  authorizated,
} = require('../middleware/userState.middleware');

const cardController = new CardController();

router.post(
  '/column/:columnId/cards',
  authorizated,
  hasMinimumPermission('write'),
  cardController.createCard,
);
router.get('/column/:columnId/cards', authorizated, cardController.getAllCards);
router.put(
  '/column/columnId/cards/:cardId',
  authorizated,
  hasMinimumPermission('write'),
  cardController.modifyCard,
);
router.put(
  '/column/cards/:cardId/position',
  authorizated,
  hasMinimumPermission('write'),
  cardController.modifyCardPosition,
);
router.delete(
  '/column/columnId/cards/:cardId',
  authorizated,
  hasMinimumPermission('write'),
  cardController.deleteCard,
);

module.exports = router;

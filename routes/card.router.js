const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cards.controller');

const cardController = new CardController();

router.post('/:columnId/cards', cardController.createCard);
router.get('/:columnId/cards', cardController.getAllCards);
router.put('/:columnId/cards/:cardId', cardController.modifyCard);
router.put('/cards', cardController.modifyCardPosition);
router.delete('/:columnId/cards/:cardId', cardController.deleteCard);

module.exports = router;

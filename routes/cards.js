const cardRouter = require('express').Router();

const {
  validationCreateCards,
  validationDeleteCard,
  validationLikeCard,
  validationDislikeCard,
} = require('../middlewares/joi');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCards, createCard);
cardRouter.delete('/:cardId', validationDeleteCard, deleteCardById);
cardRouter.put('/:cardId/likes', validationLikeCard, likeCard);
cardRouter.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = cardRouter;

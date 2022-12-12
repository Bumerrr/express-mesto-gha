const express = require('express');

const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', express.json(), createCard);
cardRouter.delete('/:cardId', deleteCardById);
cardRouter.patch('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;

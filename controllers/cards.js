/* eslint-disable no-console */
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .then(() => console.log('Карточка удалена'))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .then(() => console.log('лайк поставлен'))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .then(() => console.log('лайк убран'))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

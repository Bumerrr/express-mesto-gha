/* eslint-disable no-console */
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'id невалиден' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .then(() => console.log('пользователь создан'))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true }, // данные будут валидированы перед изменением
  )
    .then((user) => res.status(200).send(
      { name: user.name, about: user.about, avatar: user.avatar },
    ))
    .then(() => console.log('данные пользователя обновлены'))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля. ' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    avatar,
    { new: true, runValidators: true }, // данные будут валидированы перед изменением
  )
    .then((user) => res.status(200).send({ avatar: user.avatar }))
    .then(() => console.log('аватар пользователя обновлен'))
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара. ' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

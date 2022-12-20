/* eslint-disable consistent-return */
/* eslint-disable no-console */
const User = require('../models/user');
const {
  OK,
} = require('../utils/constants');

const {
  BadRequestError,
  NotFoundError,
} = require('../errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send({ data: users }))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорретный Id'));
        return;
      }
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорретный Id'));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }, // данные будут валидированы перед изменением
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(OK).send(
      { data: user },
    ))
    .then(() => console.log('данные пользователя обновлены'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорретные данные'));
      }

      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорретный Id'));
      }

      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    avatar,
    { new: true, runValidators: true }, // данные будут валидированы перед изменением
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорретные данные'));
      }

      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорретный Id'));
      }

      next(err);
    });
};

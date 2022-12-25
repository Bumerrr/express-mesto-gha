const userRouter = require('express').Router();

const {
  validationFindUserById,
  validationUpdateUserInfo,
  validationUpdateUserAvatar,
} = require('../midlewares/joi');

const {
  getUsers,
  getUserMe,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:userId', validationFindUserById, getUserById);
userRouter.patch('/me', validationUpdateUserInfo, updateUser);
userRouter.patch('/me/avatar', validationUpdateUserAvatar, updateAvatar);
module.exports = userRouter;

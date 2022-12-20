const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  getUserMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
module.exports = userRouter;

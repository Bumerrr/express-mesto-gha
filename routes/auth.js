const routerr = require('express').Router();

const {
  validationSignUp,
  validationSignIn,
} = require('../middlewares/joi');

const {
  createUser, login,
} = require('../controllers/auth');

routerr.post('/signup', validationSignUp, createUser);

routerr.post('/signin', validationSignIn, login);

module.exports = routerr;

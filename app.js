/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const auth = require('./midlewares/auth');
const authRoutes = require('./routes/auth');

const NotFoundError = require('./errors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log(`server connect to ${MONGO_URL}`);
    app.listen(PORT);
    console.log(`server listen port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(limiter);
app.use(helmet());

app.use(authRoutes);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use(() => {
  throw new NotFoundError({ message: 'Адреса по вашему запросу не существует' });
});
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    essage: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

connect();

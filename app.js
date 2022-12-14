/* eslint-disable no-console */
const express = require('express');

const mongoose = require('mongoose');

const app = express();

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const usersRoutes = require('./routes/users');

const cardsRoutes = require('./routes/cards');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '63963126ff9a04d42d7836f0', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

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

app.get('/', (req, res) => {
  res.send('немного текста');
});

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Not found' });
});
app.use(limiter);
app.use(helmet());

connect();

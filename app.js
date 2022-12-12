/* eslint-disable no-console */
const express = require('express');

const mongoose = require('mongoose');

const app = express();

// const router = require('./routes');

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

app.get('/', (req, res) => {
  res.send('немного текста');
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

connect();

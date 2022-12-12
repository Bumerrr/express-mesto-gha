const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 30,
    minlength: 2,
  },
  about: {
    required: true,
    type: String,
    maxlength: 30,
    minlength: 2,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'ссылка на аватар должна быть валидной',
    },
  },
});
module.exports = mongoose.model('user', userSchema);

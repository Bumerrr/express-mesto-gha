const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  about: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'ссылка на аватар должна быть валидной',
    },
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);

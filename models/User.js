const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
  },
  dob: String,
  gender: String,
  address: String
});

module.exports = mongoose.model('users', User);
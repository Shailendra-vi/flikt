const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dataList: [
    {
      name: String,
      email: String,
      address: String,
      phoneNumber: String,
      gender: String,
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

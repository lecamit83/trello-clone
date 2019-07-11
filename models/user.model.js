const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const Schema = mongoose.Schema;
const SALT_ROUND = 10;

const userSchema = new Schema({
  name : {
    type : String,
  },
  email : {
    type : String,
  },
  password : {
    type : String,
  },
  tokens : [{
    token: {
      type : String
    }
  }]
}, {
  timestamps : true,
});

userSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password ,SALT_ROUND, function(err, encrypted) {
    user.password = encrypted;
    next();
  });
});

const User = mongoose.model('User', userSchema);
module.exports = User;

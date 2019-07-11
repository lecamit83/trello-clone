const User = require('../models/user.model');

const { 
  validateLogin,
  validateRegister,

} = require('../validations/user.validation');

function verifyLogin(req, res, next) {
  const { errors, isValid, data } = validateLogin(req.body);
  if( !isValid ) {
    return next({errors, code : 'USER_ERROR'});
  }
  req.body = data;
  next();
}

async function verifyRegister(req, res, next) {
  const { errors, isValid, data } = validateRegister(req.body); 
  if( !isValid ) {
    return next({errors, code : 'USER_ERROR'});
  }
  // Check exist email
  const result = await User.findOne({ email : data['email'] });
  if(result) {
    errors.push('Email was exist');
    return next({errors, code : 'USER_ERROR'});
  }
  req.body = data;
  next();
}

module.exports = {
  verifyLogin,
  verifyRegister,
}

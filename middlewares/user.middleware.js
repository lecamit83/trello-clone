const User = require('../models/user.model');

const { 
  validateLogin,
  validateRegister,

} = require('../validations/user.validation');

async function verifyLogin(req, res, next) {
  const { errors, isValid, data } = validateLogin(req.body);
  if( !isValid ) {
    return next({errors, code : 'USER_ERROR'});
  }
  try {
    const { user, error } = await User.findByCredentials(data.email, data.password);
    if(Object.keys(error).length !== 0) {
      return next(error);
    }
    req.user = user;
    next();

  } catch (errors) {
    return next({ errors, code : 'USER_ERROR'});
  }
  
  
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

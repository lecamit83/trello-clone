const User = require('../models/user.model');
function getHomePage(req, res) {
  res.status(200).send({message : 'This Home Page'});
}
async function registerUser(req, res) {
  let user = new User(req.body);

  try {
    let token = await user.generateToken();
    await user.save();
    res.status(201).send({user, token});
  } catch (errors) {
    return next({ errors, code : 'USER_ERROR'});
  }
  
}

async function loggedIn(req, res) {
  let user = req.user;
  try {
    let token = await user.generateToken();
    await user.save();
    res.status(201).send({user, token});

  } catch (errors) {
    return next({ errors, code : 'USER_ERROR'});
  }
}
module.exports = {
  getHomePage,
  registerUser,
  loggedIn,

}

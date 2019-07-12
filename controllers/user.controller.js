const User = require('../models/user.model');
function getHomePage(req, res) {
  res.status(200).send({message : 'This Home Page'});
}
async function registerUser(req, res, next) {
  let user = new User(req.body);

  try {
    let token = await user.generateToken();
    await user.save();
    res.status(201).send({user, token});
  } catch (errors) {
    return next(errors);
  }
  
}

async function loggedIn(req, res, next) {
  let user = req.user;
  try {
    let token = await user.generateToken();
    await user.save();
    res.status(201).send({user, token});

  } catch (errors) {
    return next(errors);
  }
}

async function loggedOut(req, res, next) {
  try {
    let user = req.user;
    user.tokens = [];
    await user.save();

    res.status(200).send({message : 'Logout Success!'});
  } catch (error) {
    return next(error);
  }
}

function getProfile(req, res) {
  res.status(200).send(req.user);
}

module.exports = {
  getHomePage,
  registerUser,
  loggedIn,
  loggedOut,
  getProfile
}

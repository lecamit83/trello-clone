const User = require('../models/user.model');
function getHomePage(req, res) {
  res.status(200).send({message : 'This Home Page'});
}
function registerUser(req, res) {
  let user = new User(req.body);
  user.save().then(function(){
    res.status(201).send(user);
  });
}
module.exports = {
  getHomePage,
  registerUser,

}

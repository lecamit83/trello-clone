const User = require('../models/user.model');
const { isMember } = require('../utils');
async function inviteMembers(req, res, next) {
  try {
    let email = req.body.email.trim();
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(404).send({ message : 'User Not Found!'});
    }
    let board = req.board;
    if(isMember(board.partners, user._id)) {
      return res.status(400).send({ message : 'Member is exist!'});
    }

    let partner = {
      personId : user._id,
      isAdmin : false
    }
    board.partners = board.partners.concat(partner);  

    await board.save();
    res.status(200).send({ message : 'Invite Success!', board});
  } catch (error) {
    next(error);
  }
}
module.exports = {
  inviteMembers
}

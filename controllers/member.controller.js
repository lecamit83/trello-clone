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

async function removeMembers(req, res, next) {
  try {
    let board = req.board;
    let userId = req.params.userId;

    if(!isMember(board.partners, userId)) {
      return res.status(400).send({ message : 'User NOT in Board' })
    }

    board.partners = board.partners.filter(function(partner) {
      return partner.personId.toString() !== userId.toString();
    });

    await board.save();
    res.status(200).send({message : 'User was removed!'});

  } catch (error) {
    next(error);
  }
}

async function changePermissionMember(req, res, next) {
  try {
    let board = req.board;
    let userId = req.params.userId;
    let createdBy = board.createdBy;
    console.log(createdBy);

    if(!isMember(board.partners, userId)) {
      return res.status(400).send({ message : 'User NOT in Board' })
    }

    if(userId.toString() === createdBy.toString()) {
      return res.status(403).send({message : 'Can\'t update permission owner board!'});
    }
    board.partners = board.partners.filter(function(partner) {
      if(partner.personId.toString() === userId.toString()) {
        partner.isAdmin = !partner.isAdmin;
      }
      return partner;
    });
    
    await board.save();
    res.status(200).send({message : 'User was updated permission!'});

  } catch (error) {
    next(error);
  }
}
module.exports = {
  inviteMembers,
  removeMembers,
  changePermissionMember,

}

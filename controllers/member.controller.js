const User = require('../models/user.model');
const { isMember } = require('../utils');
async function inviteMembers(req, res, next) {
  try {
    let email = req.body.email.trim();
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(404).send({ message : 'User Not Found!'});
    }
    let participant = req.participant;
    if(isMember(participant.participants, user._id)) {
      return res.status(400).send({ message : 'Member is exist!'});
    }

    let partner = {
      personId : user._id,
      isAdmin : false
    }
    participant.participants = participant.participants.concat(partner);  

    await participant.save();
    res.status(200).send({ message : 'Invite Success!', participant});
  } catch (error) {
    next(error);
  }
}

async function removeMembers(req, res, next) {
  try {
    let participant = req.participant,
        userId = req.params.userId;

    if(!isMember(participant.participants, userId)) {
      return res.status(404).send({ message : 'User NOT in Board' })
    }

    participant.participants = participant.participants.filter(function(partner) {
      return partner.personId.toString() !== userId.toString();
    });

    await participant.save();
    res.status(204).send({message : 'User was removed!'});

  } catch (error) {
    next(error);
  }
}

async function changePermissionMember(req, res, next) {
  try {
    let { participant , board } = req,
        userId = req.params.userId,
        createdBy = board.createdBy;

    if(!isMember(participant.participants, userId)) {
      return res.status(400).send({ message : 'User NOT in Board' })
    }

    if(userId.toString() === createdBy.toString()) {
      return res.status(403).send({message : 'Can\'t update permission owner board!'});
    }
    participant.participants = participant.participants.filter(function(partner) {
      if(partner.personId.toString() === userId.toString()) {
        // toggle isAdmin
        partner.isAdmin = !partner.isAdmin;
      }
      return partner;
    });
    
    await participant.save();
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

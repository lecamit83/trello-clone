const Board = require('../models/board.model');
const Participant = require('../models/participant.model');
const { isMember } = require('../utils');

async function membersPermission(req, res, next) {
  try {
    let myId = req.user._id;
    let boardId = req.params.boardId;
    let board = await Board.findOne({_id : boardId });

    if(!board ) {
      return res.status(404).send({ message : 'Board Not Found!'});
    }
    let participant = await Participant.findOne({ _id : board.partners });

    if(!participant) {
      return res.status(500).send({ message : 'Participant Not Found!'});
    }
    
    if(!isMember(participant.participants, myId)) {
      return res.status(403).send({message : 'Forbidden!'});
    }
    req.board = board;
    req.participant = participant;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  membersPermission,
  
}

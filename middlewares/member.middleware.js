const Board = require('../models/board.model');
const { isMember } = require('../utils');

async function membersPermission(req, res, next) {
  try {
    let myId = req.user._id;
    let boardId = req.params.boardId;
    let board = await Board.findById(boardId);

    if(!board ) {
      return res.status(404).send({ message : 'Board Not Found!'});
    }
    if(!isMember(board.partners, myId)) {
      return res.status(403).send({message : 'Forbidden!'});
    }
    req.board = board;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  membersPermission,
  
}

const Board = require('../models/board.model');
const { validateBoard } = require('../validations/board.validation');
function verifyBoard(req, res, next) {
  
  const { errors, isValid, board } = validateBoard(req.body);
  if( !isValid ) {
    return res.status(400).send(errors);
  }
  createdBy = req.user._id;
  partners =[{
    personId : req.user._id,
    isAdmin : true
  }];
  req.board = { ...board, createdBy, partners };
  next();
}

async function verifyPermission(req, res, next) {
  try {
    let userId = req.user._id;
    let boardId = req.params.boardId;
    let board = await Board.findById(boardId);
    if(!board) {
      return res.status(404).send({message : 'Board Not Found'});
    }
    console.log(board.createdBy, userId);
    
    if(board.createdBy.toString() !== userId.toString()){
      return res.status(403).send({ message : 'Forbidden'})
    }
    req.board = board;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyBoard,
  verifyPermission
}

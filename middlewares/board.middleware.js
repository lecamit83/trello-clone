const { validateBoard } = require('../validations/board.validation');
function verifyBoard(req, res, next) {
  
  const { errors, isValid, board } = validateBoard(req.body);
  if( !isValid ) {
    return res.status(400).send(errors);
  }
  createdBy = req.user._id;
  req.board = { ...board, createdBy};
  next();
}

module.exports = {
  verifyBoard,
  
}

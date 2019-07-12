const Board = require('../models/board.model');

async function createBoard(req, res, next) {
  console.log(req.board);
  
  try {
    var board = new Board(req.board);
    await board.save();

    res.status(201).send({ message : 'Success', board });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBoard,

}

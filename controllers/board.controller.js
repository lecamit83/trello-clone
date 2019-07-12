const Board = require('../models/board.model');

async function createBoard(req, res, next) {
  try {
    var board = new Board(req.board);
    await board.save();

    res.status(201).send({ message : 'Success', board });
  } catch (error) {
    next(error);
  }
}

async function getBoards(req, res) {
  try {

    let createdBy = req.user._id;
    let results = await Board.find({ createdBy });
    res.status(200).send(results);
  
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateBoard(req, res, next) {
  try {
    let boardName = req.body.title.trim();
    let board = req.board;
    board.title = boardName;
    await board.save();
    res.status(200).send({ message : 'Update Success' });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createBoard,
  getBoards,
  updateBoard,
}

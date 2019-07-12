const express = require('express');
const { verifyAuth } = require('../middlewares/user.middleware');
const { verifyBoard } = require('../middlewares/board.middleware');
const boardController = require('../controllers/board.controller');
var router = express.Router();

router.route('/create')
  .post(verifyAuth, verifyBoard, boardController.createBoard);
router.route('/all')
  .get(verifyAuth, boardController.getBoards);
module.exports = router;

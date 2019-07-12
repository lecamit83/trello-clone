const express = require('express');
const { verifyAuth } = require('../middlewares/user.middleware');
const { verifyBoard } = require('../middlewares/board.middleware');
const boardController = require('../controllers/board.controller');
var router = express.Router();

router.route('/create')
  .post(verifyAuth, verifyBoard, boardController.createBoard);

module.exports = router;

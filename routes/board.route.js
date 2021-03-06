const express = require('express');
const { verifyAuth } = require('../middlewares/user.middleware');
const { verifyBoard, verifyPermission } = require('../middlewares/board.middleware');
const boardController = require('../controllers/board.controller');
var router = express.Router();

router.route('/create')
  .post(verifyAuth, verifyBoard, boardController.createBoard);
router.route('/all')
  .get(verifyAuth, boardController.getBoards);
router.route('/update/:boardId')
  .patch(verifyAuth, verifyPermission, boardController.updateBoard);
router.route('/search/:title')
  .get(verifyAuth, boardController.searchBoard);
router.route('/delete/:boardId')
  .delete(verifyAuth, verifyPermission, boardController.deleteBoard);
module.exports = router;

const express = require('express');
const { verifyAuth } = require('../middlewares/user.middleware');
const { membersPermission } = require('../middlewares/member.middleware');
const { verifyPermission } = require('../middlewares/board.middleware');
const { inviteMembers, removeMembers , changePermissionMember } = require('../controllers/member.controller');
const router = express.Router();

router.route('/invite/:boardId')
  .post(verifyAuth, membersPermission , inviteMembers);
router.route('/remove/:boardId/:userId')
  .delete(verifyAuth, verifyPermission , removeMembers);
router.route('/change/:boardId/:userId')
  .patch(verifyAuth, verifyPermission, changePermissionMember);
module.exports = router;

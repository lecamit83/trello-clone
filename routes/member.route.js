const express = require('express');
const { verifyAuth } = require('../middlewares/user.middleware');
const { membersPermission } = require('../middlewares/member.middleware');
const { inviteMembers } = require('../controllers/member.controller');
const router = express.Router();

router.route('/invite/:boardId')
  .patch(verifyAuth, membersPermission , inviteMembers);

module.exports = router;

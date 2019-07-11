const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');
router.route('/')
  .get(userControllers.getHomePage);
router.route('/register')
  .post(userMiddlewares.verifyRegister , userControllers.registerUser);

// Error Handler User
router.use(function(err, req, res, next) {
  const { errors, code } = err;
  if(code !== 'USER_ERROR') {
    return next(err);
  }
  res.status(401).send({errors});
});
module.exports = router;

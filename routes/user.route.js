const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');
router.route('/')
  .get(userControllers.getHomePage);
router.route('/register')
  .post(userMiddlewares.verifyRegister , userControllers.registerUser);
router.route('/login')
  .post(userMiddlewares.verifyLogin, userControllers.loggedIn);
router.route('/logout')
  .post(userMiddlewares.verifyAuth, userControllers.loggedOut);
router.route('/profile/me')
  .get(userMiddlewares.verifyAuth, userControllers.getProfile)
  .patch(userMiddlewares.verifyAuth, userControllers.updateProfile)
// Error Handler User
router.use(function(err, req, res, next) {
  const { errors, code } = err;
  if(code !== 'USER_ERROR') {
    return next(err);
  }
  res.status(401).send({errors});
});
module.exports = router;

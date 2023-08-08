const express = require('express');
const signupController = require('../controllers/signup.controller');
const {
  loginController,
  logoutController,
} = require('../controllers/auth.controller');

const { isLoggedIn } = require('../middleware/userState.middleware');

const router = express.Router();

router.post('/join', signupController);

router.post('/login', isLoggedIn, loginController);

router.post('/logout', isLoggedIn, logoutController);

module.exports = router;

const express = require('express');
const router = express.Router();
// Import configured Google Passport strategy
const passport = require('../config/passport/google.auth');
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/login', (req, res, next) => {
  res.render('public/login');
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/home');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/home', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('auth/home', {
    user: req.user,
  });
});

module.exports = router;

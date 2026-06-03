const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// LOGIN
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
    session: true
  }),
  (req, res) => {
    res.send('Login successful. You can close this tab.');
  }
);

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/api-docs');
  });
});

module.exports = router;
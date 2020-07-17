const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const passport = require('passport');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  try {
    console.log(req.body)
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    User.create({ username: req.body.username, email: req.body.email, password: hashedpassword })
      .then(result => {
        console.log('In Save');
        return res.status(200).json('Signup Successful !');
      })
      .catch(error => {
        if (error.code === 11000) {
          return res.status(409).send('User already exists !');
        } else {
          console.log(JSON.stringigy(error, null, 2));
          return res.status(500).send('Error signing up user');
        }
      })
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ username: req.user.username, email: req.user.email, _id: req.user._id });
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  req.logout();
  res.send({ success: true });
});

module.exports = router;
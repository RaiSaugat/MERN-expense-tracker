const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const { getUsers, signup, login } = require('../controllers/users-controllers');

router.route('/').get(getUsers);

router
  .route('/signup')
  .post(
    [
      check('name').not().isEmpty(),
      check('email').normalizeEmail().isEmail(),
      check('password').isLength({ min: 6 }),
    ],
    signup
  );

router.route('/login').post(login);

module.exports = router;

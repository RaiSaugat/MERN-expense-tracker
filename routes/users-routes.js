const express = require('express');
const router = express.Router();

const { getUsers, signup, login } = require('../controllers/users-controllers');

router.route('/').get(getUsers);

router.route('/signup').post(signup);

router.route('/login').post(login);

module.exports = router;

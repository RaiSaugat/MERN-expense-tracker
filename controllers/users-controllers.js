const DUMMY_USERS = [
  {
    id: '1',
    name: 'Saugat Rai',
    email: 'email@g.com',
    password: 'tester',
  },
];

const HttpError = require('../models/http-error');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = (req, res, next) => {
  res.status(200).json({
    users: DUMMY_USERS,
  });
};

// @desc    Sign in a users
// @route   POST /api/v1/users/signup
// @access  Public
exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = {
    id: 2,
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    users: createdUser,
  });
};

// @desc    Login a users
// @route   POST /api/v1/users/login
// @access  Private
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seems to be wrong',
      401
    );
  }

  res.status(200).json({
    success: true,
    message: 'Login success',
  });
};

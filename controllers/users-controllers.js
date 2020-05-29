const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/User.js');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((user) => user.toObject({ getters: true })),
    });
  } catch (error) {
    return next(new HttpError('Fetching user failed, please try again', 500));
  }
};

// @desc    Sign in a users
// @route   POST /api/v1/users/signup
// @access  Public
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  const { name, password, email } = req.body;

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError('User with the email already exist', 422));
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      return next(new HttpError('Could not create error', 500));
    }

    const newUser = {
      name,
      email,
      password: hashedPassword,
      expenses: [],
    };

    const user = await User.create(newUser);
    let token;

    try {
      token = jwt.sign(
        { userId: user._id, email: user.email },
        'supersecret_key',
        { expiresIn: '1h' }
      );
    } catch (error) {
      return next(
        new HttpError('Signing up failed, please try again later', 500)
      );
    }

    res.status(201).json({
      success: true,
      name: user.name,
      userId: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    return next(
      new HttpError('Signing up failed, please try again later', 500)
    );
  }
};

// @desc    Login a users
// @route   POST /api/v1/users/login
// @access  Private
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(
        new HttpError(
          'Could not identify user, credentials seems to be wrong',
          401
        )
      );
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      return next(
        new HttpError('Could not log in, please check your credentials', 500)
      );
    }

    if (!isValidPassword) {
      return next(
        new HttpError(
          'Could not identify user, credentials seems to be wrong',
          403
        )
      );
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'supersecret_key',
        { expiresIn: '1h' }
      );
    } catch (error) {
      return next(new HttpError('Log in failed, please try again later', 500));
    }

    res.status(200).json({
      success: true,
      name: existingUser.name,
      userId: existingUser._id,
      email: existingUser.email,
      token: token,
    });
  } catch (err) {
    return next(
      new HttpError(
        'Could not identify user, credentials seems to be wrong',
        500
      )
    );
  }
};

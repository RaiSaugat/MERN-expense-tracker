const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Expense = require('../models/Expense');
const User = require('../models/User');
const HttpError = require('../models/http-error');

// @desc    Get all expenses
// @route   GET /api/v1/expenses
// @access  Public
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses.map((expense) => expense.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError('Server error', 500));
  }
};

// @desc    Get selected expenses
// @route   GET /api/v1/expenses/id
// @access  Public
exports.getExpenseById = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    const expenses = await Expense.findById(expenseId);
    if (!expenses) {
      return next(
        new HttpError('Could not find a place with provided id', 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: expenses.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError('Server error', 500));
  }
};

// @desc    Get selected expenses by User id
// @route   GET /api/v1/expenses/user/uid
// @access  Public
exports.getExpensesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const userWithExpenses = await User.findById(userId).populate('expenses');

    if (!userWithExpenses || userWithExpenses.length === 0) {
      return next(
        new HttpError('Could not find expenses for the provided id', 404)
      );
    }

    res.status(200).json({
      data: userWithExpenses.expenses.map((expense) =>
        expense.toObject({ getters: true })
      ),
    });
  } catch (err) {
    return next(new HttpError('Server error', 500));
  }
};

// @desc    Add expenses
// @route   POST /api/v1/expenses
// @access  Public
exports.addExpenses = async (req, res, next) => {
  const { type, amount, createdAt } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data'),
      422
    );
  }

  req.userData;

  try {
    const newExpense = new Expense({
      type,
      amount,
      createdAt,
      creator: req.userData.userId,
    });

    const user = await User.findById(req.userData.userId);

    if (!user) {
      return next(new HttpError('Could not find user for provided id', 404));
    }

    //creating session for optimistic update
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newExpense.save({ session: sess });
    user.expenses.push(newExpense);
    await user.save({ session: sess });
    await sess.commitTransaction();

    return res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return next(new HttpError(messages, 400));
    } else {
      return next(
        new HttpError(
          'Creating new expense failed, please try again later',
          500
        )
      );
    }
  }
};

// @desc    Update expenses
// @route   POST /api/v1/expenses/:id
// @access  Public
exports.updateExpenses = async (req, res, next) => {
  const { type, amount, createdAt } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data'),
      422
    );
  }

  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Data not found',
      });
    }

    if (expense.creator.toString() !== req.userData.userId) {
      return next(
        new HttpError('You are not allowed to update this expense', 403)
      );
    }

    expense.type = type;
    expense.amount = amount;
    expense.createdAt = createdAt;

    await expense.save();
    return res.status(200).json({
      success: true,
      data: expense.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError('Server error', 500));
  }
};

// @desc    Delete expenses
// @route   DELETE /api/v1/expenses/:id
// @access  Public
exports.deleteExpenses = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    const expense = await Expense.findById(expenseId).populate('creator');

    if (!expense) {
      return next(new HttpError('Could not find expense for this id', 404));
    }

    if (expense.creator.id !== req.userData.userId) {
      return next(
        new HttpError('You are not allowed to delete this expense', 403)
      );
    }

    //creating session
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await expense.remove({ session: sess });
    expense.creator.expenses.pull(expense);
    await expense.creator.save({ session: sess });
    await sess.commitTransaction();

    return res.status(200).json({
      success: true,
      expenseId: expense._id,
    });
  } catch (err) {
    return next(new HttpError('No Expense Found ', 404));
  }
};

const Expense = require('../models/Expense');
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
      data: expenses,
    });
  } catch (err) {
    next(new HttpError('Server error', 500));
  }
};

// @desc    Get selected expenses
// @route   GET /api/v1/expenses/id
// @access  Public
exports.getExpenseById = async (req, res, next) => {
  try {
    const expenses = await Expense.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    next(new HttpError('Server error', 500));
  }
};

// @desc    Add expenses
// @route   POST /api/v1/expenses
// @access  Public
exports.addExpenses = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);

    return res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      next(new HttpError(messages, 400));
    } else {
      next(new HttpError('Server error', 500));
    }
  }
};

// @desc    Update expenses
// @route   POST /api/v1/expenses/:id
// @access  Public
exports.updateExpenses = async (req, res, next) => {
  const { id, type, amount, createdAt } = req.body;
  console.log(req.body);

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Data not found',
      });
    } else {
      expense.type = type;
      expense.amount = amount;
      expense.createdAt = createdAt;

      await expense.save();
      return res.status(200).json({
        success: true,
        data: expense,
      });
    }
  } catch (err) {
    next(new HttpError('Server error', 500));
  }
};

// @desc    Delete expenses
// @route   DELETE /api/v1/expenses/:id
// @access  Public
exports.deleteExpenses = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    await expense.remove();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(new HttpError('No Expense Found ', 404));
  }
};

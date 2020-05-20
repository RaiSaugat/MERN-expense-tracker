const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/v1/expenses
// @access  Public
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find();

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get selected expenses
// @route   GET /api/v1/expenses/id
// @access  Public
exports.getSelectedExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add expenses
// @route   POST /api/v1/expenses
// @access  Public
exports.addExpenses = async (req, res, next) => {
  try {
    const { type, amount, createdAt } = req.body;
    const expense = await Expense.create(req.body);

    return res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Update expenses
// @route   POST /api/v1/expenses/:id
// @access  Public
exports.updateExpenses = async (req, res, next) => {
  const { id, type, amount, createdAt } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Data not found',
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
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc    Delete expenses
// @route   DELETE /api/v1/expenses/:id
// @access  Public
exports.deleteExpenses = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'No Expense found',
      });
    }
    await expense.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

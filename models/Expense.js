const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: [true, 'Please select type'],
  },
  amount: {
    type: Number,
    required: [true, 'Please enter amount'],
  },
  unitFrom: {
    type: Number,
  },
  unitTo: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);

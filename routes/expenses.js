const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  addExpenses,
  deleteExpenses,
  updateExpenses,
  getSelectedExpense,
} = require('../controllers/expenses');

router.route('/').get(getAllExpenses).post(addExpenses);

router
  .route('/:id')
  .delete(deleteExpenses)
  .post(updateExpenses)
  .get(getSelectedExpense);

module.exports = router;

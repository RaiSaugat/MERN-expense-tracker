const express = require('express');
const router = express.Router();

const {
  getAllExpenses,
  addExpenses,
  deleteExpenses,
  updateExpenses,
  getExpenseById,
} = require('../controllers/expenses-controllers');

router.route('/').get(getAllExpenses).post(addExpenses);

router
  .route('/:id')
  .get(getExpenseById)
  .patch(updateExpenses)
  .delete(deleteExpenses);

module.exports = router;

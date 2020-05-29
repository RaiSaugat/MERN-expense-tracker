const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
  getAllExpenses,
  addExpenses,
  deleteExpenses,
  updateExpenses,
  getExpenseById,
  getExpensesByUserId,
} = require('../controllers/expenses-controllers');
const checkAuth = require('../middleware/check-auth');

router.route('/').get(getAllExpenses);

router.route('/user/:uid').get(getExpensesByUserId);

router.route('/:id').get(getExpenseById);

router.use(checkAuth);

router.route('/').post([check('amount').not().isEmpty()], addExpenses);

router
  .route('/:id')
  .patch([check('amount').not().isEmpty()], updateExpenses)
  .delete(deleteExpenses);

module.exports = router;

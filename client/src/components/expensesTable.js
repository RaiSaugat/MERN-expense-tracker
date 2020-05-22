import React, { useContext, useEffect } from 'react';
import moment from 'moment';

import './expenseTable.scss';

import { GlobalContext } from '../context/GlobalState';
import Expense from './expense';
import LoadingText from './shared/loadingText/loadingText';

const ExpenseTable = () => {
  const {
    expenses,
    getAllExpenses,
    loading,
    filterMonth,
    filterType,
  } = useContext(GlobalContext);

  useEffect(() => {
    getAllExpenses();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredExpense = [];
  if (filterMonth === 'all') {
    filteredExpense = expenses;
  } else {
    filteredExpense = expenses.filter(
      (expense) => moment(expense.createdAt).format('MMMM') === filterMonth
    );
  }

  return (
    <div className="expense-table">
      <div className="expense-header">
        <span>Type</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Actions</span>
      </div>
      <div className="expense-data">
        {loading ? (
          <LoadingText text="Loading Data..." />
        ) : (
          filteredExpense &&
          filteredExpense.map((expense) => {
            return <Expense key={expense._id} expense={expense} />;
          })
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;

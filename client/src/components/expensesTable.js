import React, { useContext, useEffect } from 'react';

import './expenseTable.scss';

import { GlobalContext } from '../context/GlobalState';
import Expense from './expense';

const ExpenseTable = () => {
  const { expenses, getExpenses, loading } = useContext(GlobalContext);

  console.log(expenses);

  useEffect(() => {
    getExpenses();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <p>Loading</p>
        ) : (
          expenses &&
          expenses.map((expense) => {
            return <Expense key={expense._id} expense={expense} />;
          })
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;

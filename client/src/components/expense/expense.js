import React from 'react';

import ExpenseHeader from './expenseHeader';
import ExpenseTable from './expensesTable';

const Expense = () => {
  return (
    <React.Fragment>
      <ExpenseHeader />
      <ExpenseTable />
    </React.Fragment>
  );
};

export default Expense;

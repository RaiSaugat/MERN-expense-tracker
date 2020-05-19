import React from 'react';

import ExpenseHeader from './expenseHeader';
import ExpensesTable from './expensesTable';

const Home = () => {
  return (
    <React.Fragment>
      <ExpenseHeader />
      <ExpensesTable />
    </React.Fragment>
  );
};

export default Home;

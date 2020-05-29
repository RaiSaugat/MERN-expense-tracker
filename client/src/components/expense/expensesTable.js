import React, { useContext } from 'react';
import moment from 'moment';

import './expenseTable.scss';

import { LoadingText } from 'components/shared';
import { GlobalContext } from 'context/GlobalState';
import ExpenseList from 'components/expenseList';

const ExpenseTable = () => {
  const { expenses, loading, filterMonth, currentUser } = useContext(
    GlobalContext
  );

  const { token } = currentUser;

  // const [localLoader, setLocalLoader] = useState(false);

  // useEffect(() => {
  //   if (loading) {
  //     setLocalLoader(true);
  //   } else {
  //     setLocalLoader(false);
  //   }
  // }, [loading]);

  let filteredExpense;
  if (expenses.length > 0) {
    if (filterMonth === 'all') {
      filteredExpense = expenses;
    }
  }

  if (expenses.length > 0) {
    if (filterMonth === 'all') {
      filteredExpense = expenses;
    } else {
      filteredExpense = expenses.filter(
        (expense) => moment(expense.createdAt).format('MMMM') === filterMonth
      );
    }
  }

  return (
    <div className="expense-table">
      <div className="expense-header">
        <span>Type</span>
        <span>Amount</span>
        <span>Date</span>
        {token && <span>Actions</span>}
      </div>
      <div className="expense-data">
        {loading && !filteredExpense && <LoadingText text="Loading Data..." />}
        {!loading && !filteredExpense && (
          <p className="no-expense">No Expense</p>
        )}
        {filteredExpense &&
          filteredExpense.map((expense) => {
            return <ExpenseList key={expense._id} expense={expense} />;
          })}
      </div>
    </div>
  );
};

export default ExpenseTable;

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ExpenseForm from '../components/expenseForm';
import { GlobalContext } from '../context/GlobalState';

const EditExpense = () => {
  const { getSelectedExpense, expense } = useContext(GlobalContext);
  const params = useParams();
  useEffect(() => {
    getSelectedExpense(params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ExpenseForm expense={expense} />;
};

export default EditExpense;

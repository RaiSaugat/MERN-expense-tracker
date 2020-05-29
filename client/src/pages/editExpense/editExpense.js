import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GlobalContext } from 'context/GlobalState';
import { ExpenseForm } from 'components';
import { useHttpClient } from 'hooks/http-hook';

const EditExpensePage = () => {
  const { getExpenseById, expense, handleLoading } = useContext(GlobalContext);
  const params = useParams();

  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const editUsers = async () => {
      try {
        handleLoading(true);
        const responseData = await sendRequest(`/api/v1/expenses/${params.id}`);
        getExpenseById(responseData.data);
        handleLoading(false);
      } catch (error) {
        handleLoading(false);
      }
    };
    editUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ExpenseForm expense={expense} />;
};

export default EditExpensePage;

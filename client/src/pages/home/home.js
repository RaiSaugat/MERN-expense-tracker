import React, { useEffect, useContext } from 'react';

import { Expense } from 'components';
import { useHttpClient } from 'hooks/http-hook';
import { GlobalContext } from 'context/GlobalState';

const Home = () => {
  const { getExpenseByUserId, handleLoading, currentUser } = useContext(
    GlobalContext
  );

  const { userId } = currentUser;

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUserExpense = async () => {
      try {
        handleLoading(true);
        const responseData = await sendRequest(
          `/api/v1/expenses/user/${userId}`
        );

        getExpenseByUserId(responseData.data);
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
        console.log(err);
      }
    };
    fetchUserExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest]);
  return <Expense />;
};

export default Home;

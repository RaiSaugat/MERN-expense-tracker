import React, { useEffect, useContext } from 'react';

import { UsersList } from 'components';
import { LoadingText } from 'components/shared';
import { useHttpClient } from 'hooks/http-hook';
import { GlobalContext } from 'context/GlobalState';

const UsersPage = () => {
  const { getAllUsers, handleLoading, loading, users } = useContext(
    GlobalContext
  );

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        handleLoading(true);
        const responseData = await sendRequest(`/api/v1/users`);
        getAllUsers(responseData.data);
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest]);

  if (loading && users.length < 1) {
    return <LoadingText text="Loading users..." />;
  }

  return <UsersList users={users} />;
};

export default UsersPage;

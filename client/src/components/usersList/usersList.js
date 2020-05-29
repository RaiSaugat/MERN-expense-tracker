import React from 'react';
import UserItem from 'components/userItem';

const UsersList = ({ users }) => {
  return (
    users.length > 0 &&
    users.map((user) => <UserItem user={user} key={user.id} />)
  );
};

export default UsersList;

import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div className="user">
      <p>{user.name}</p>
      {/* <p>{user.}</p> */}
    </div>
  );
};

export default UserItem;

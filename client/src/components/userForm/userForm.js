import React from 'react';

const UserForm = () => {
  return (
    <form>
      <div className="form__control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div className="form__control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>

      <div className="form__control">
        <button class="button ">Submit</button>
      </div>
    </form>
  );
};

export default UserForm;

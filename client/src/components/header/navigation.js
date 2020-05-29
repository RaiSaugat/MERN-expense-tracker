import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import navigationStyles from './navigation.module.scss';

import { GlobalContext } from 'context/GlobalState';

const Navigation = () => {
  const { currentUser, logout } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <nav className={navigationStyles.nav}>
        <ul className={navigationStyles.nav__list}>
          {currentUser.token && (
            <li className={navigationStyles.nav__item}>
              <NavLink activeClassName={navigationStyles.active} to="/" exact>
                Home
              </NavLink>
            </li>
          )}
          {!currentUser.token && (
            <li className={navigationStyles.nav__item}>
              <NavLink activeClassName={navigationStyles.active} to="/auth">
                Login / Signup
              </NavLink>
            </li>
          )}
          {currentUser.token && (
            <li className={navigationStyles.nav__item}>
              <NavLink activeClassName={navigationStyles.active} to="/add">
                Add Expenses
              </NavLink>
            </li>
          )}
          {/* {currentUser.token && (
            <li className={navigationStyles.nav__item}>
              <NavLink activeClassName={navigationStyles.active} to="/users">
                Users
              </NavLink>
            </li>
          )} */}
          {currentUser.token && (
            <li className={navigationStyles.nav__item}>
              <h3 className={navigationStyles.nav__user}>
                {currentUser.name}
                <div className={navigationStyles.dropdown}>
                  {currentUser.token && (
                    <li className={navigationStyles.nav__item}>
                      <NavLink
                        activeClassName={navigationStyles.active}
                        to="/add"
                      >
                        Add Expenses
                      </NavLink>
                    </li>
                  )}
                  <button className="button transparent" onClick={logout}>
                    Logout
                  </button>
                </div>
              </h3>
            </li>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;

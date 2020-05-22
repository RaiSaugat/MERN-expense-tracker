import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">House Expense Tracker</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/add">
              Add Expenses
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
